import MergeStyle from './utils/MergeStyle.js';
import TextArea from '../../textarea/TextArea.js';
import CreateChild from './utils/CreateChild.js';
import ReplaceSliderConfig from './utils/ReplaceSliderConfig.js';

var CreateTextArea = function (scene, data, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', styles, customBuilders);
    CreateChild(scene, data, 'text', styles, customBuilders);
    ReplaceSliderConfig(scene, data.slider, styles, customBuilders);
    CreateChild(scene, data, 'header', styles, customBuilders);
    CreateChild(scene, data, 'footer', styles, customBuilders);

    var gameObject = new TextArea(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateTextArea;