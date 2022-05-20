/*
type: label
name:

# Relace child config by game objct
background:
icon:
text:
action:
# ----

width:
height:
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

var CreateLabel = function (scene, config, styles, customBuilders) {
    config = GetConfig(config, styles);

    // Replace config by child game object
    CreateChild(scene, config, 'background', styles, customBuilders);
    CreateChild(scene, config, 'icon', styles, customBuilders);
    CreateChild(scene, config, 'text', styles, customBuilders);
    CreateChild(scene, config, 'action', styles, customBuilders);

    var gameObjects = new Label(scene, config);
    scene.add.existing(gameObjects);
    return gameObjects;
}

export default CreateLabel;