import BuildLabelConfig from './BuildLabelConfig.js';
import DefaultCreateBackground from './CreateBackground.js';
import DefaultCreateText from './CreateText.js';
import SetValue from '../../../../plugins/utils/object/SetValue.js';
import WrapExpandText from '../wrapexpandtext/WrapExpandText.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var BuildTitleLabelConfig = function (scene, config, creators) {
    config = BuildLabelConfig(scene, config, creators);

    var createInnerBackground = GetValue(creators, 'innerBackground', DefaultCreateBackground);
    var createSeparator = GetValue(creators, 'separator', DefaultCreateBackground);
    var createTitle = GetValue(creators, 'title', DefaultCreateText);


    if (createInnerBackground) {
        config.innerBackground = createInnerBackground(scene, config.innerBackground);
    } else {
        delete config.innerBackground;
    }

    if (createSeparator) {
        var configSeparator = config.separator || {};
        configSeparator.height = configSeparator.width;
        config.separator = createSeparator(scene, configSeparator);
    } else {
        delete config.separator;
    }

    if (createTitle) {
        var wrapTitle = GetValue(config, 'wrapTitle', false);

        if (wrapTitle) {
            if (wrapTitle === true) {
                wrapTitle = 'word';
            }
            SetValue(config, 'title.wrap.mode', wrapTitle);
            config.expandTitleWidth = true;
        }

        config.title = createTitle(scene, config.title);

        if (wrapTitle) {
            config.title = WrapExpandText(config.title);
        }
    } else {
        delete config.title;
    }

    // Keep config.background as the bottom element
    // And config.innerBackground is 2nd bottom element
    if (config.innerBackground && config.background) {
        var displayList = scene.children;
        displayList.moveBelow(config.innerBackground, config.background);  // Move child1 below child2
        displayList.moveBelow(config.background, config.innerBackground);  // Move child1 below child2
    }

    return config;
}

export default BuildTitleLabelConfig