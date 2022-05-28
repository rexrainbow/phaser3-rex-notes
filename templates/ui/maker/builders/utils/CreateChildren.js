import CreateChild from './CreateChild.js';

var CreateChildren = function (scene, data, subKey, styles, customBuilders) {
    var childData = data[subKey];
    if (!childData) {
        return undefined;
    }

    if (Array.isArray(childData)) {
        for (var i = 0, cnt = childData.length; i < cnt; i++) {
            if (Array.isArray(childData[i])) { // Nested array
                CreateChildren(scene, childData, i, styles, customBuilders);
            } else {
                CreateChild(scene, childData, i, styles, customBuilders);
            }
        }
    } else {
        for (var key in childData) {
            CreateChild(scene, childData, key, styles, customBuilders);
        }
    }

    return childData;
}

export default CreateChildren;