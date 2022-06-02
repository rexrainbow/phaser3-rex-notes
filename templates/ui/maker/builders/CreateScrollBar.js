import MergeStyle from './utils/MergeStyle.js';
import ScrollBar from '../../scrollbar/ScrollBar.js';
import CreateChild from './utils/CreateChild.js';
import ReplaceSliderConfig from './utils/ReplaceSliderConfig.js';

var CreateScrollBar = function (scene, data, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', styles, customBuilders);
    ReplaceSliderConfig(scene, data.slider, styles, customBuilders);

    var buttonsConfig = data.buttons;
    if (buttonsConfig) {
        CreateChild(scene, buttonsConfig, 'top', styles, customBuilders);
        CreateChild(scene, buttonsConfig, 'bottom', styles, customBuilders);
        CreateChild(scene, buttonsConfig, 'left', styles, customBuilders);
        CreateChild(scene, buttonsConfig, 'right', styles, customBuilders);
    }

    var gameObject = new ScrollBar(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateScrollBar;