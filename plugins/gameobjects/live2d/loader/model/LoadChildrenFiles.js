import CreateBinaryFile from './CreateBinaryFile.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const ImageFile = Phaser.Loader.FileTypes.ImageFile;

var LoadChildrenFiles = function (parent, setting) {
    var loader = parent.loader;
    var xhrSettings = GetFastValue(parent.config, 'xhrSettings');
    var key = parent.key;
    var homeDir = parent.homeDir;

    // Load CubismModel
    var modelFileName = setting.getModelFileName();
    if (modelFileName !== '') {
        var modelFile = CreateBinaryFile(
            loader,
            `${key}!${modelFileName}`,
            `${homeDir}${modelFileName}`,
            xhrSettings,
            'model'
        );

        parent.addToMultiFile(modelFile);
        loader.addFile(modelFile);
    } else {
        // Error
        console.error(`Live2d: can't load model ${key}`);
        return;
    }

    // Load CubismExpression
    var cnt = setting.getExpressionCount();
    for (var i = 0; i < cnt; i++) {
        var expressionFileName = setting.getExpressionFileName(i);
        var expressionName = setting.getExpressionName(i);

        var expressionFile = CreateBinaryFile(
            loader,
            `${key}!${expressionFileName}`,
            `${homeDir}${expressionFileName}`,
            xhrSettings,
            `expressions!!!${expressionName}`
        );

        parent.addToMultiFile(expressionFile);
        loader.addFile(expressionFile);
    }

    // Load CubismPhysics
    var physicsFileName = setting.getPhysicsFileName();
    if (physicsFileName !== '') {
        var physicsFile = CreateBinaryFile(
            loader,
            `${key}!${physicsFileName}`,
            `${homeDir}${physicsFileName}`,
            xhrSettings,
            'physics'
        );

        parent.addToMultiFile(physicsFile);
        loader.addFile(physicsFile);
    }

    // Load CubismPose
    var poseFileName = setting.getPoseFileName();
    if (poseFileName !== '') {
        var poseFile = CreateBinaryFile(
            loader,
            `${key}!${poseFileName}`,
            `${homeDir}${poseFileName}`,
            xhrSettings,
            'pose'
        );

        parent.addToMultiFile(poseFile);
        loader.addFile(poseFile);
    }

    // Load UserData
    var userDataFileName = setting.getUserDataFile();
    if (userDataFileName !== '') {
        var userDataFile = CreateBinaryFile(
            loader,
            `${key}!${userDataFileName}`,
            `${homeDir}${userDataFileName}`,
            xhrSettings,
            'userData'
        );

        parent.addToMultiFile(userDataFile);
        loader.addFile(userDataFile);
    }

    // Load CubismMotion
    var groupCnt = setting.getMotionGroupCount();
    for (var gi = 0; gi < groupCnt; gi++) {
        var groupName = setting.getMotionGroupName(gi);
        var cnt = setting.getMotionCount(groupName);
        for (var i = 0; i < cnt; i++) {
            var motionFileName = setting.getMotionFileName(groupName, i);
            var motionFile = CreateBinaryFile(
                loader,
                `${key}!${motionFileName}`,
                `${homeDir}${motionFileName}`,
                xhrSettings,
                `motions!!!${groupName}!!!${i}`
            );

            parent.addToMultiFile(motionFile);
            loader.addFile(motionFile);
        }

    }

    // Load texture
    var textureCnt = setting.getTextureCount();
    for (var i = 0; i < textureCnt; i++) {
        var textureFileName = setting.getTextureFileName(i);
        if (textureFileName === '') {
            // Error
            continue;
        }

        // TODO: store texture into live2d cache?
        var imageFile = new ImageFile(
            loader,
            `${key}!${textureFileName}`,
            `${homeDir}${textureFileName}`,
            xhrSettings
        );
        imageFile.dataKey = `textures!!!${i}`;

        parent.addToMultiFile(imageFile);
        loader.addFile(imageFile);
    }

}

export default LoadChildrenFiles;