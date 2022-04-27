import { CubismFramework } from '../../framework/live2dcubismframework.js';
import { CubismDefaultParameterId } from '../../framework/cubismdefaultparameterid.js';
import { ACubismMotion } from '../../framework/motion/acubismmotion.js';
import { CubismEyeBlink } from '../../framework/effect/cubismeyeblink.js';
import { BreathParameterData, CubismBreath } from '../../framework/effect/cubismbreath.js';
import { csmVector } from '../../framework/type/csmvector.js';
import { csmMap } from '../../framework/type/csmmap.js';

var Setup = function (data) {
    // Load setting
    var setting = data.setting;
    this._modelSetting = setting;

    // Load CubismModel
    var arrayBuffer = data.model;
    // - Create this._model
    this.loadModel(arrayBuffer, arrayBuffer.byteLength);
    // - Re-create render for current this._model
    this.createRenderer();
    // - Set gl to current renderer
    this.getRenderer().startUp(this._gl);

    // Load CubismExpression
    var expressions = data.expressions;
    for (var expressionName in expressions) {
        var arrayBuffer = expressions[expressionName];
        var motion = this.loadExpression(arrayBuffer, arrayBuffer.byteLength, expressionName);

        if (this._expressions.getValue(expressionName) != null) {
            ACubismMotion.delete(this._expressions.getValue(expressionName));
            this._expressions.setValue(expressionName, null);
        }

        this._expressions.setValue(expressionName, motion);
    }

    // Load CubismPhysics
    var arrayBuffer = data.physics;
    this.loadPhysics(arrayBuffer, arrayBuffer.byteLength);

    // Load CubismPose
    var arrayBuffer = data.pose;
    this.loadPose(arrayBuffer, arrayBuffer.byteLength);

    // Setup EyeBlink
    if (setting.getEyeBlinkParameterCount() > 0) {
        this._eyeBlink = CubismEyeBlink.create(setting);
    }

    // Setup Breath
    this._breath = CubismBreath.create();

    var breathParameters = new csmVector();
    breathParameters.pushBack(
        new BreathParameterData(this._idParamAngleX, 0.0, 15.0, 6.5345, 0.5)
    );
    breathParameters.pushBack(
        new BreathParameterData(this._idParamAngleY, 0.0, 8.0, 3.5345, 0.5)
    );
    breathParameters.pushBack(
        new BreathParameterData(this._idParamAngleZ, 0.0, 10.0, 5.5345, 0.5)
    );
    breathParameters.pushBack(
        new BreathParameterData(this._idParamBodyAngleX, 0.0, 4.0, 15.5345, 0.5)
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

    this._breath.setParameters(breathParameters);

    // Load UserData
    var arrayBuffer = data.userData;
    this.loadUserData(arrayBuffer, arrayBuffer.byteLength);

    // Setup EyeBlinkIds
    var eyeBlinkIdCount = setting.getEyeBlinkParameterCount();
    for (var i = 0; i < eyeBlinkIdCount; i++) {
        this._eyeBlinkIds.pushBack(setting.getEyeBlinkParameterId(i));
    }

    // Setup LipSyncIds
    var lipSyncIdCount = setting.getLipSyncParameterCount();
    for (let i = 0; i < lipSyncIdCount; i++) {
        this._lipSyncIds.pushBack(setting.getLipSyncParameterId(i));
    }

    // Setup Layout
    var layout = new csmMap();
    setting.getLayoutMap(layout);
    this._modelMatrix.setupFromLayout(layout);

    // Load CubismMotion
    this._model.saveParameters();
    var motionGroups = data.motions;
    for (var groupName in motionGroups) {
        var motionGroup = motionGroups[groupName];
        for (var i in motionGroup) {
            var arrayBuffer = motionGroup[i];
            var motionName = `${groupName}_${i}`;
            var motion = this.loadMotion(arrayBuffer, arrayBuffer.byteLength, motionName);

            i = parseInt(i);
            var fadeTime = setting.getMotionFadeInTimeValue(groupName, i);
            if (fadeTime >= 0.0) {
                motion.setFadeInTime(fadeTime);
            }

            var fadeTime = setting.getMotionFadeOutTimeValue(groupName, i);
            if (fadeTime >= 0.0) {
                motion.setFadeOutTime(fadeTime);
            }

            motion.setEffectIds(this._eyeBlinkIds, this._lipSyncIds);

            if (this._motions.getValue(motionName) != null) {
                ACubismMotion.delete(this._motions.getValue(motionName));
            }

            this._motions.setValue(motionName, motion);
        }

    }

    // Load texture
    var textures = data.textures;
    for (var i in textures) {
        this.getRenderer().bindTexture(parseInt(i), textures[i]);
    }

    // Stop all motions
    this._motionManager.stopAllMotions();


    return this;
}

export default Setup;