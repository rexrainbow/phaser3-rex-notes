import MergeStyle from './utils/MergeStyle.js';
import FixWidthSizer from '../../fixwidthsizer/FixWidthSizer.js';
import CreateChild from './utils/CreateChild.js';

var CreateFixWidthSizer = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var backgroundConfig = data.background;
    delete data.background;
    if (backgroundConfig) {
        if (!Array.isArray(backgroundConfig)) {
            backgroundConfig = [backgroundConfig];
        }
        for (var i = 0, cnt = backgroundConfig.length; i < cnt; i++) {
            var childConfig = backgroundConfig[i];
            if (!childConfig.child) {
                childConfig = { child: childConfig };
                backgroundConfig[i] = childConfig;
            }
            CreateChild(scene, childConfig, 'child', view, styles, customBuilders);
        }
    }

    var childrenConfig = data.children;
    delete data.children;
    if (childrenConfig) {
        for (var i = 0, cnt = childrenConfig.length; i < cnt; i++) {
            var childConfig = childrenConfig[i];
            if (!childConfig.child) {
                childConfig = { child: childConfig };
                childrenConfig[i] = childConfig;
            }
            CreateChild(scene, childConfig, 'child', view, styles, customBuilders);
        }
    }

    var gameObject = new FixWidthSizer(scene, data);
    scene.add.existing(gameObject);

    if (backgroundConfig) {
        for (var i = 0, cnt = backgroundConfig.length; i < cnt; i++) {
            var childConfig = backgroundConfig[i];
            gameObject.addBackground(childConfig.child, childConfig.padding);
        }
    }

    if (childrenConfig) {
        for (var i = 0, cnt = childrenConfig.length; i < cnt; i++) {
            var childConfig = childrenConfig[i];
            gameObject.add(childConfig.child, childConfig);
        }
    }

    return gameObject;
}

export default CreateFixWidthSizer;