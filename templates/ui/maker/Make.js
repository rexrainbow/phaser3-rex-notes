import Builders from './builders/Builders.js';

var Make = function (scene, config, styles, customBuilders) {
    var type = config.type;
    var callback;
    if (customBuilders) {
        callback = customBuilders[type]
    }
    if (!callback) {
        callback = Builders[type];
    }
    if (!callback) {
        console.warn(`rexUI.Make: Can't create ${type} game object.`)
        return undefined;
    }

    var gameObject = callback(scene, config, styles, customBuilders);
    if (config.name) {
        gameObject.setName(config.name);
    }

    return gameObject;
}

export default Make;