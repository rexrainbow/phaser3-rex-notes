import CommandExecutor from '../../../plugins/commandexecutor.js';
import { LayerNames } from '../const/Layers.js';
import RegisterBackgroundType from './RegisterBackgroundType.js';
import RegisterSpriteType from './RegisterSpriteType.js';
import RegisterTextboxType from './RegisterTextboxType.js';
import RegisterChoiceDialogType from './RegisterChoiceDialogType.js';

const RegisterHandlers = [
    RegisterBackgroundType,
    RegisterSpriteType,
    RegisterTextboxType,
    RegisterChoiceDialogType
];


var CreateCommandExecutor = function (scene, config) {
    var { layerDepth, } = config;
    var commandExecutor = new CommandExecutor(scene, {
        layers: LayerNames,
        layerDepth: layerDepth,
    });

    for (var i = 0, cnt = RegisterHandlers.length; i < cnt; i++) {
        RegisterHandlers[i](commandExecutor, config);
    }

    return commandExecutor;
}

export default CreateCommandExecutor;