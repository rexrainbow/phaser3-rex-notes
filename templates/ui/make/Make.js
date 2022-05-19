import MakeCallbacks from './makecallbacks/MakeCallbacks.js';

var Make = function (scene, config, defaultConfig, customMakeCallbacks) {
    var type = config.type;
    var callback;
    if (customMakeCallbacks) {
        callback = customMakeCallbacks[type]
    }
    if (!callback) {
        callback = MakeCallbacks[type];
    }
    if (!callback) {
        return undefined;
    }

    var gameObject = callback(scene, config, defaultConfig, customMakeCallbacks);
    if (config.name) {
        gameObject.setName(config.name);
    }

    return gameObject;
}

export default Make;