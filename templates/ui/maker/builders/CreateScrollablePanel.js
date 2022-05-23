import MergeStyle from './utils/MergeStyle.js';
import ScrollablePanel from '../../scrollablepanel/ScrollablePanel.js';
import CreateChild from './utils/CreateChild.js';

var CreateScrollablePanel = function (scene, data, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', styles, customBuilders);

    var panelConfig = data.panel;
    if (panelConfig) {
        CreateChild(scene, panelConfig, 'child', styles, customBuilders);
    }

    var sliderConfig = data.slider;
    if (sliderConfig) {
        CreateChild(scene, sliderConfig, 'background', styles, customBuilders);
        CreateChild(scene, sliderConfig, 'track', styles, customBuilders);
        CreateChild(scene, sliderConfig, 'indicator', styles, customBuilders);
        CreateChild(scene, sliderConfig, 'thumb', styles, customBuilders);

        var sliderButtonsConfig = sliderConfig.buttons;
        if (sliderButtonsConfig) {
            CreateChild(scene, sliderButtonsConfig, 'top', styles, customBuilders);
            CreateChild(scene, sliderButtonsConfig, 'bottom', styles, customBuilders);
            CreateChild(scene, sliderButtonsConfig, 'left', styles, customBuilders);
            CreateChild(scene, sliderButtonsConfig, 'right', styles, customBuilders);
        }
    }

    CreateChild(scene, data, 'header', styles, customBuilders);

    CreateChild(scene, data, 'footer', styles, customBuilders);

    var gameObject = new ScrollablePanel(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateScrollablePanel;