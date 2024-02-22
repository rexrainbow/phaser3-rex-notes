import IsGameObject from '../../../../plugins/utils/system/IsGameObject.js';
import IsFunction from '../../../../plugins/utils/object/IsFunction.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var GetGameObjectFromConfig = function (
    scene,
    config, key,
    createCallbackData,
    defaultCreateGameObjectCallback
) {

    var creatorConfig = GetValue(config, key);

    var gameObject;

    if (IsGameObject(creatorConfig)) {
        gameObject = creatorConfig;
        delete config[key];  // Remove reference of game object

    } else if (IsFunction(creatorConfig)) {
        gameObject = creatorConfig(scene, createCallbackData);
        scene.add.existing(gameObject);

    } else if (defaultCreateGameObjectCallback) {
        gameObject = defaultCreateGameObjectCallback(scene, creatorConfig, createCallbackData);
        scene.add.existing(gameObject);
    }

    return gameObject;
}

export default GetGameObjectFromConfig;