import { CubismFramework } from '../../framework/src/live2dcubismframework';
import { CubismDefaultParameterId } from '../../framework/src/cubismdefaultparameterid';
import { ACubismMotion } from '../../framework/src/motion/acubismmotion';
import { CubismEyeBlink } from '../../framework/src/effect/cubismeyeblink';
import { BreathParameterData, CubismBreath } from '../../framework/src/effect/cubismbreath';
import { csmVector } from '../../framework/src/type/csmvector';
import { csmMap } from '../../framework/src/type/csmmap';

var Setup = function (model, data) {
    // Load setting
    model._modelSetting = data.setting;

    // Load CubismModel
    var arrayBuffer = data.model;
    // - Create model._model
    model.loadModel(arrayBuffer, arrayBuffer.byteLength);
    // - Re-create render for current model._model
    model.createRenderer();

    // Load CubismExpression
    var expressions = data.expressions;
    for (var expressionName in expressions) {
        var arrayBuffer = expressions[expressionName];
        var motion = model.loadExpression(arrayBuffer, arrayBuffer.byteLength, expressionName);

        if (model._expressions.getValue(expressionName) != null) {
            ACubismMotion.delete(model._expressions.getValue(expressionName));
            model._expressions.setValue(expressionName, null);
        }

        model._expressions.setValue(expressionName, motion);
    }

    // Load CubismPhysics
    var arrayBuffer = data.physics;
    model.loadPhysics(arrayBuffer, arrayBuffer.byteLength);

    // Load CubismPose
    var arrayBuffer = data.pose;
    model.loadPose(arrayBuffer, arrayBuffer.byteLength);

    // Setup EyeBlink
    if (model._modelSetting.getEyeBlinkParameterCount() > 0) {
        model._eyeBlink = CubismEyeBlink.create(model._modelSetting);
    }

    // Setup Breath
    model._breath = CubismBreath.create();

    var breathParameters = new csmVector();
    breathParameters.pushBack(
        new BreathParameterData(model._idParamAngleX, 0.0, 15.0, 6.5345, 0.5)
    );
    breathParameters.pushBack(
        new BreathParameterData(model._idParamAngleY, 0.0, 8.0, 3.5345, 0.5)
    );
    breathParameters.pushBack(
        new BreathParameterData(model._idParamAngleZ, 0.0, 10.0, 5.5345, 0.5)
    );
    breathParameters.pushBack(
        new BreathParameterData(model._idParamBodyAngleX, 0.0, 4.0, 15.5345, 0.5)
    );
    breathParameters.pushBack(
        new BreathParameterData(
            CubismFramework.getIdManager().getId(
                CubismDefaultParameterId.ParamBreath
            ),
            0.5,
            0.5,
            3.2345,
            1
        )
    );

    model._breath.setParameters(breathParameters);

    // Load UserData
    var arrayBuffer = data.userData;
    model.loadUserData(arrayBuffer, arrayBuffer.byteLength);

    // Setup EyeBlinkIds
    var eyeBlinkIdCount = model._modelSetting.getEyeBlinkParameterCount();
    for (var i = 0; i < eyeBlinkIdCount; i++) {
        model._eyeBlinkIds.pushBack(model._modelSetting.getEyeBlinkParameterId(i));
    }

    // Setup LipSyncIds
    var lipSyncIdCount = model._modelSetting.getLipSyncParameterCount();
    for (let i = 0; i < lipSyncIdCount; i++) {
        model._lipSyncIds.pushBack(model._modelSetting.getLipSyncParameterId(i));
    }

    // Setup Layout
    var layout = new csmMap();
    model._modelSetting.getLayoutMap(layout);
    model._modelMatrix.setupFromLayout(layout);

    // Load CubismMotion
    model._model.saveParameters();
    var motionGroups = data.motions;
    for (var groupName in motionGroups) {
        var motionGroup = motionGroups[groupName];
        for (var i in motionGroup) {
            var arrayBuffer = motionGroup[i];
            var motionName = `${groupName}_${i}`;
            var motion = model.loadMotion(arrayBuffer, arrayBuffer.byteLength, motionName);

            i = parseInt(i);
            var fadeTime = model._modelSetting.getMotionFadeInTimeValue(groupName, i);
            if (fadeTime >= 0.0) {
                motion.setFadeInTime(fadeTime);
            }

            var fadeTime = model._modelSetting.getMotionFadeOutTimeValue(groupName, i);
            if (fadeTime >= 0.0) {
                motion.setFadeOutTime(fadeTime);
            }

            motion.setEffectIds(model._eyeBlinkIds, model._lipSyncIds);

            if (model._motions.getValue(motionName) != null) {
                ACubismMotion.delete(model._motions.getValue(motionName));
            }

            model._motions.setValue(motionName, motion);
        }

    }

    // Load texture
    var textures = data.textures;
    for (var i in textures) {
        model.getRenderer().bindTexture(parseInt(i), textures[i]);
    }

    // Stop all motions
    model._motionManager.stopAllMotions();

    // TODO: Set gl in render stage?
    // this.getRenderer().startUp(gl);

}

export default Setup;