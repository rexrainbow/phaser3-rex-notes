import Make from '../Make.js';

var CreateChild = function (scene, data, childKey, view, styles, customBuilders) {
    var child;
    var childData = data[childKey];
    if (childData) {
        child = Make(scene, childData, view, styles, customBuilders);
        data[childKey] = child;
    }

    return child;
}

export default CreateChild;