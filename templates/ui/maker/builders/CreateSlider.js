import MergeStyle from './utils/MergeStyle.js';
import Slider from '../../slider/Slider.js';
import CreateChild from './utils/CreateChild.js';

var CreateSlider = function (scene, data, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', styles, customBuilders);
    CreateChild(scene, data, 'track', styles, customBuilders);
    CreateChild(scene, data, 'indicator', styles, customBuilders);
    CreateChild(scene, data, 'thumb', styles, customBuilders);

    var gameObject = new Slider(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateSlider;