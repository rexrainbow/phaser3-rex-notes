import CommandExecutor from '../../../plugins/commandexecutor.js';
import GetViewport from '../../../plugins/utils/system/GetViewport.js';
import { LayerConfigMultipleCamras, LayerConfigSingleCamera } from '../const/Layers.js';
import FullWindowZone from '../../../plugins/fullwindowzone.js';
import RegisterBackgroundType from './background/RegisterBackgroundType.js';
import RegisterSpriteType from './sprite/RegisterSpriteType.js';
import RegisterTextboxType from './textbox/RegisterTextboxType.js';
import RegisterTitleType from './title/RegisterTitleType.js';
import RegisterChoiceDialogType from './choicedialog/RegisterChoiceDialogType.js';
import RegisterNameInputDialogType from './nameinputdialog/RegisterChoiceDialogType.js';

const RegisterHandlers = [
    RegisterSpriteType,
    RegisterTextboxType,
    RegisterBackgroundType,
    RegisterChoiceDialogType,
    RegisterNameInputDialogType,
    RegisterTitleType,
];


var CreateCommandExecutor = function (scene, config) {
    var {
        layerDepth,
        rootLayer,
        multipleCamerasEnable = false,
        viewport
    } = config;

    if (viewport === undefined) {
        config.viewport = GetViewport(scene, scene.cameras.main);
    }

    var commandExecutor = new CommandExecutor(scene, {
        layers: (multipleCamerasEnable) ? LayerConfigMultipleCamras : LayerConfigSingleCamera,
        layerDepth,
        rootLayer,
    });

    for (var i = 0, cnt = RegisterHandlers.length; i < cnt; i++) {
        RegisterHandlers[i](commandExecutor, config);
    }

    // Add anyTouchDetector to bottomLayer
    var anyTouchDetector = new FullWindowZone(scene).setInteractive();
    scene.add.existing(anyTouchDetector);
    commandExecutor.sys.layerManager.addToBottomLayer(anyTouchDetector);
    commandExecutor.sys.anyTouchDetector = anyTouchDetector;

    return commandExecutor;
}

export default CreateCommandExecutor;