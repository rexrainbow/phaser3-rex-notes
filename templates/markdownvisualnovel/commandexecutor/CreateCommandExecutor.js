import CommandExecutor from '../../../plugins/commandexecutor.js';
import GetViewport from '../../../plugins/utils/system/GetViewport.js';
import { LayerNames } from '../const/Layers.js';
import RegisterBackgroundType from './background/RegisterBackgroundType.js';
import RegisterSpriteType from './sprite/RegisterSpriteType.js';
import RegisterTextboxType from './textbox/RegisterTextboxType.js';
import RegisterChoiceDialogType from './choicedialog/RegisterChoiceDialogType.js';

const RegisterHandlers = [
    RegisterSpriteType,
    RegisterTextboxType,
    RegisterBackgroundType,
    RegisterChoiceDialogType
];


var CreateCommandExecutor = function (scene, config) {
    var {
        layerDepth,
        rootLayer,
        viewport
    } = config;

    if (viewport === undefined) {
        config.viewport = GetViewport(scene, scene.cameras.main);
    }

    var commandExecutor = new CommandExecutor(scene, {
        layers: LayerNames,
        layerDepth,
        rootLayer,
    });

    for (var i = 0, cnt = RegisterHandlers.length; i < cnt; i++) {
        RegisterHandlers[i](commandExecutor, config);
    }

    return commandExecutor;
}

export default CreateCommandExecutor;