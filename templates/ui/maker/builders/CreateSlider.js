import MergeStyle from './MergeStyle.js';
import Slider from '../../slider/Slider.js';
import CreateChild from './CreateChild.js';

var CreateSlider = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'track', view, styles, customBuilders);
    CreateChild(scene, data, 'indicator', view, styles, customBuilders);
    CreateChild(scene, data, 'thumb', view, styles, customBuilders);

    var gameObjects = new Slider(scene, data);
    scene.add.existing(gameObjects);
    return gameObjects;
};

export default CreateSlider;