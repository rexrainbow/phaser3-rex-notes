/*
type: slider
name:

# Relace child config by game objct
background:
track:
indicator:
thumb:
# ----

width:
height:
input:
orientation:
value:
gap:
easeValue:
    duration:
    ease:
space:
    left:
    right:
    top:
    bottom:
enable:
draggable:
*/

import GetConfig from './GetConfig.js';
import Slider from '../../slider/Slider.js';
import CreateChild from './CreateChild.js';

var CreateSlider = function (scene, config, styles, customBuilders) {
    config = GetConfig(config, styles);

    // Replace config by child game object
    CreateChild(scene, config, 'background', styles, customBuilders);
    CreateChild(scene, config, 'track', styles, customBuilders);
    CreateChild(scene, config, 'indicator', styles, customBuilders);
    CreateChild(scene, config, 'thumb', styles, customBuilders);

    var gameObjects = new Slider(scene, config);
    scene.add.existing(gameObjects);
    return gameObjects;
};

export default CreateSlider;