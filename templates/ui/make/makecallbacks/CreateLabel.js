/*
type: label
// Relace child config by game objct
background:
icon:
text:
action:
// ----
orientation:
iconMask:
expandTextWidth:
expandTextHeight:
actionMask:
align:
space:
    left:
    right:
    top:
    bottom:
    icon:
    text:
draggable:
*/

import GetConfig from './GetConfig.js';
import Label from '../../label/Label.js';
import ReplaceChildConfig from './ReplaceChildConfig.js';

var CreateLabel = function (scene, config, styles, customMakeCallbacks) {
    config = GetConfig(config, styles);

    // Replace config by child game object
    ReplaceChildConfig(scene, config, 'background', styles, customMakeCallbacks);
    ReplaceChildConfig(scene, config, 'icon', styles, customMakeCallbacks);
    ReplaceChildConfig(scene, config, 'text', styles, customMakeCallbacks);
    ReplaceChildConfig(scene, config, 'action', styles, customMakeCallbacks);

    var gameObjects = new Label(scene, config);
    scene.add.existing(gameObjects);
    return gameObjects;
}

export default CreateLabel;