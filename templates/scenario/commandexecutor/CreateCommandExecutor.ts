import CommandExecutor from '../../../plugins/commandexecutor';
import GetViewport from '../../../plugins/utils/system/GetViewport';
import { LayerConfigMultipleCamras, LayerConfigSingleCamera } from '../const/Layers';
import FullWindowZone from '../../../plugins/fullwindowzone';
import RegisterBackgroundType from './background/RegisterBackgroundType';
import RegisterSpriteType from './sprite/RegisterSpriteType';
import RegisterTextboxType from './textbox/RegisterTextboxType';
import RegisterTitleType from './title/RegisterTitleType';
import RegisterChoiceDialogType from './choicedialog/RegisterChoiceDialogType';
import RegisterNameInputDialogType from './nameinputdialog/RegisterChoiceDialogType';

const RegisterHandlers = [
    RegisterSpriteType,
    RegisterTextboxType,
    RegisterBackgroundType,
    RegisterChoiceDialogType,
    RegisterNameInputDialogType,
    RegisterTitleType,
];


var CreateCommandExecutor = function(scene?: any, config?: any) {
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