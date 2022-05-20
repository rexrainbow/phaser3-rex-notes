import Make from '../Make.js';

var CreateChild = function (scene, config, childKey, styles, customBuilders) {
    var child;
    var childConfig = config[childKey];
    if (childConfig) {
        child = Make(scene, childConfig, styles, customBuilders);
        config[childKey] = child;
    }

    return child;
}

export default CreateChild;