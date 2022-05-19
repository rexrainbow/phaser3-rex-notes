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

import Label from '../../label/Label.js';
import ReplaceChildConfig from './ReplaceChildConfig.js';

var CreateLabel = function (scene, config, defaultConfig, customMakeCallbacks) {
    // Replace config by child game object
    ReplaceChildConfig(scene, config, 'background', defaultConfig, customMakeCallbacks);
    ReplaceChildConfig(scene, config, 'icon', defaultConfig, customMakeCallbacks);
    ReplaceChildConfig(scene, config, 'text', defaultConfig, customMakeCallbacks);
    ReplaceChildConfig(scene, config, 'action', defaultConfig, customMakeCallbacks);

    var gameObjects = new Label(scene, config);
    scene.add.existing(gameObjects);
    return gameObjects;
}

export default CreateLabel;