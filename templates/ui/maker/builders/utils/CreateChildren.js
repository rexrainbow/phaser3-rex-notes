import CreateChild from './CreateChild.js';

var CreateChildren = function (scene, data, subKey, view, styles, customBuilders) {
    var childData = data[subKey];
    if (!childData) {
        return undefined;
    }

    if (Array.isArray(childData)) {
        for (var i = 0, cnt = childData.length; i < cnt; i++) {
            CreateChild(scene, childData, i, view, styles, customBuilders);
        }
    } else {
        for (var key in childData) {
            CreateChild(scene, childData, key, view, styles, customBuilders);
        }
    }

    return childData;
}

export default CreateChildren;