import Make from './Make.js';

var ReplaceChildConfig = function (scene, config, childKey, defaultConfig, customMakeCallbacks) {
    var child;
    var childConfig = config[childKey];
    if (childConfig) {
        child = Make(scene, childConfig, defaultConfig, customMakeCallbacks);
        config[childKey] = child;
    }

    return child;
}

export default ReplaceChildConfig;