import { BGLayer, GOLayer, UILayer } from './Const.js';
import RegisterBackgroundType from './RegisterBackgroundType.js';
import RegisterTextboxType from './RegisterTextboxType.js';
import RegisterSpriteType from './RegisterSpriteType.js';
import RegisterChoiceDialogType from './RegisterChoiceDialogType.js';

const RegisterHandlers = [
    RegisterBackgroundType,
    RegisterTextboxType,
    RegisterSpriteType,
    RegisterChoiceDialogType
];

var CreateCommandExecutor = function (scene) {
    var commandExecutor = scene.plugins.get('rexMarkedEventSheets').addCommandExecutor(scene, {
        layers: [BGLayer, GOLayer, UILayer]
    })

    for (var i = 0, cnt = RegisterHandlers.length; i < cnt; i++) {
        RegisterHandlers[i](commandExecutor);
    }

    return commandExecutor;
}

export default CreateCommandExecutor;