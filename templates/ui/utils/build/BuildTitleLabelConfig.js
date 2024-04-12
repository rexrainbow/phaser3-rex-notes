import BuildLabelConfig from './BuildLabelConfig.js';
import DefaultCreateBackground from './CreateBackground.js';
import DefaultCreateText from './CreateText.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var BuildTitleLabelConfig = function (scene, config, creators) {
    var createInnerBackground = GetValue(creators, 'innerBackground', DefaultCreateBackground);
    var createSeparator = GetValue(creators, 'separator', DefaultCreateBackground);
    var createTitle = GetValue(creators, 'title', DefaultCreateText);

    var innerBackground, separator;

    // Create innerBackground before background
    if ((config.innerBackground !== null) && createInnerBackground) {
        innerBackground = createInnerBackground(scene, config.innerBackground);
    }

    // Create separator before background
    if ((config.separator !== null) && createSeparator) {
        separator = createSeparator(scene, config.separator);
    }

    config = BuildLabelConfig(scene, config, creators);

    if (innerBackground) {
        config.innerBackground = innerBackground;
    } else {
        delete config.innerBackground;
    }

    if (separator) {
        config.separator = separator;
    } else {
        delete config.separator;
    }

    if ((config.title !== null) && createTitle) {
        config.title = createTitle(scene, config.title);
    } else {
        delete config.title;
    }

    // Keep background as the bottom element
    var background = config.background;
    if (background) {
        if (innerBackground) {
            scene.children.moveBelow(background, innerBackground);  // Move child1 below child2
        } else if (separator) {
            scene.children.moveBelow(background, separator);  // Move child1 below child2
        }
    }

    return config;
}

export default BuildTitleLabelConfig