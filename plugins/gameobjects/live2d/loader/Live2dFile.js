import Live2dBaseFile from './Live2dFileBase.js';
import LoadChildFile from './LoadChildFile.js';
import { CubismModelSettingJson } from '../framework/src/cubismmodelsettingjson';

class Live2dFile extends Live2dBaseFile {
    constructor(loader, key, url, xhrSettings) {
        // 1. Load setting
        super(loader, key, url, xhrSettings);

        this.homeDir = url.substring(0, url.lastIndexOf('/') + 1);
    }

    loadChildrenFiles(setting) {
        // Load CubismModel
        var modelFileName = setting.getModelFileName();
        if (modelFileName !== '') {
            LoadChildFile(this, modelFileName, 'model')
        } else {
            // Error
            return;
        }

        // Load CubismExpression
        var cnt = setting.getExpressionCount();
        for (var i = 0; i < cnt; i++) {
            var expressionFileName = setting.getExpressionFileName(i);
            var expressionName = setting.getExpressionName(i);
            LoadChildFile(this, expressionFileName, `expression.${expressionName}`);
        }

        // Load CubismPhysics
        var physicsFileName = setting.getPhysicsFileName();
        if (physicsFileName !== '') {
            LoadChildFile(this, physicsFileName, 'physics');
        }

        // Load CubismPose
        var poseFileName = setting.getPoseFileName();
        if (poseFileName !== '') {
            LoadChildFile(this, poseFileName, 'pose');
        }

        // Load UserData
        var userDataFileName = setting.getUserDataFile();
        if (userDataFileName !== '') {
            LoadChildFile(this, userDataFileName, 'userData');
        }

        // Load CubismMotion
        var groupCnt = setting.getMotionGroupCount();
        for (var gi = 0; gi < groupCnt; gi++) {
            var groupName = setting.getMotionGroupName(gi);
            var cnt = setting.getMotionCount(groupName);
            for (var i = 0; i < cnt; i++) {
                var motionFileName = setting.getMotionFileName(groupName, i);
                LoadChildFile(this, motionFileName, `motion.${groupName}.${i}`);
            }

        }

    }

    onProcess() {
        var arrayBuffer = this.xhrLoader.response; // Array buffer 
        var setting = new CubismModelSettingJson(arrayBuffer, arrayBuffer.byteLength);
        this.data = {
            setting: setting
        };

        this.loadChildrenFiles(setting);

        this.state = Phaser.Loader.FILE_PROCESSING;
        this.onProcessComplete();
    }

}

export default Live2dFile;