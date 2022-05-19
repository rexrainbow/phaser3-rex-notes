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
import CreateChild from './CreateChild.js';

var CreateLabel = function (scene, config, styles, customMakeCallbacks) {
    config = GetConfig(config, styles);

    // Replace config by child game object
    CreateChild(scene, config, 'background', styles, customMakeCallbacks);
    CreateChild(scene, config, 'icon', styles, customMakeCallbacks);
    CreateChild(scene, config, 'text', styles, customMakeCallbacks);
    CreateChild(scene, config, 'action', styles, customMakeCallbacks);

    var gameObjects = new Label(scene, config);
    scene.add.existing(gameObjects);
    return gameObjects;
}

export default CreateLabel;