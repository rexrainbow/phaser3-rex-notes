import Builders from './builders/Builders.js';

var Make = function (scene, data, view, styles, customBuilders) {
    var type = data.$type;
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

    var gameObject = callback(scene, data, view, styles, customBuilders);
    if (data.name) {
        gameObject.setName(data.name);
    }

    return gameObject;
}

export default Make;