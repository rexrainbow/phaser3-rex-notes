import MergeStyle from './utils/MergeStyle.js';
import ScrollablePanel from '../../scrollablepanel/ScrollablePanel.js';
import CreateChild from './utils/CreateChild.js';

var CreateScrollablePanel = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);

    var panelConfig = data.panel;
    if (panelConfig) {
        CreateChild(scene, panelConfig, 'child', view, styles, customBuilders);
    }

    var sliderConfig = data.slider;
    if (sliderConfig) {
        CreateChild(scene, sliderConfig, 'background', view, styles, customBuilders);
        CreateChild(scene, sliderConfig, 'track', view, styles, customBuilders);
        CreateChild(scene, sliderConfig, 'indicator', view, styles, customBuilders);
        CreateChild(scene, sliderConfig, 'thumb', view, styles, customBuilders);

        var sliderButtonsConfig = sliderConfig.buttons;
        if (sliderButtonsConfig) {
            CreateChild(scene, sliderButtonsConfig, 'top', view, styles, customBuilders);
            CreateChild(scene, sliderButtonsConfig, 'bottom', view, styles, customBuilders);
            CreateChild(scene, sliderButtonsConfig, 'left', view, styles, customBuilders);
            CreateChild(scene, sliderButtonsConfig, 'right', view, styles, customBuilders);
        }
    }

    CreateChild(scene, data, 'header', view, styles, customBuilders);

    CreateChild(scene, data, 'footer', view, styles, customBuilders);

    var gameObject = new ScrollablePanel(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
};

export default CreateScrollablePanel;