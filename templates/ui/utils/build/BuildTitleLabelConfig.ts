import BuildLabelConfig from './BuildLabelConfig';
import DefaultCreateBackground from './CreateBackground';
import DefaultCreateText from './CreateText';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var BuildTitleLabelConfig = function(scene?: any, config?: any, creators?: any) {
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

    if (innerBackground?: any) {
        config.innerBackground = innerBackground;
    } else {
        delete config.innerBackground;
    }

    if (separator?: any) {
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
    if (background?: any) {
        if (innerBackground?: any) {
            scene.children.moveBelow(background, innerBackground);  // Move child1 below child2
        } else if (separator) {
            scene.children.moveBelow(background, separator);  // Move child1 below child2
        }
    }

    return config;
}

export default BuildTitleLabelConfig