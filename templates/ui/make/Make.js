import MakeCallbacks from './makecallbacks/MakeCallbacks.js';

var Make = function (scene, config, styles, customMakeCallbacks) {
    var type = config.type;
    var callback;
    if (customMakeCallbacks) {
        callback = customMakeCallbacks[type]
    }
    if (!callback) {
        callback = MakeCallbacks[type];
    }
    if (!callback) {
        console.warn(`rexUI.Make: Can't create ${type} game object.`)
        return undefined;
    }

    var gameObject = callback(scene, config, styles, customMakeCallbacks);
    if (config.name) {
        gameObject.setName(config.name);
    }

    return gameObject;
}

export default Make;