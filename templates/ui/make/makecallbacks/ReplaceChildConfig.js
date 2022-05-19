import Make from '../Make.js';

var ReplaceChildConfig = function (scene, config, childKey, styles, customMakeCallbacks) {
    var child;
    var childConfig = config[childKey];
    if (childConfig) {
        child = Make(scene, childConfig, styles, customMakeCallbacks);
        config[childKey] = child;
    }

    return child;
}

export default ReplaceChildConfig;