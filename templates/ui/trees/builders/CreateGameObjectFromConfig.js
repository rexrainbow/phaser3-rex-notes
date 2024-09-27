import IsGameObject from '../../../../plugins/utils/system/IsGameObject.js';
import IsFunction from '../../../../plugins/utils/object/IsFunction.js';

var CreateGameObjectFromConfig = function (
    scene,
    config,
    callbackData,
    defaultCallback,
    isRequired = false
) {
    var gameObject;

    if (IsGameObject(config)) {
        gameObject = config;
        delete config[key];  // Remove reference of game object

    } else if (IsFunction(config)) {
        var callback = config;
        gameObject = callback(scene, callbackData);
        if (gameObject) {
            scene.add.existing(gameObject);
        }

    } else if ((isRequired || config) && defaultCallback) {
        gameObject = defaultCallback(scene, config, callbackData);
        // Will add to scene in defaultCallback
    }

    return gameObject;
}

export default CreateGameObjectFromConfig;