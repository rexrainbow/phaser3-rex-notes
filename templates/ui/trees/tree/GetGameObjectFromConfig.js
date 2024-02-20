import IsFunction from '../../../../plugins/utils/object/IsFunction.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var GetGameObjectFromConfig = function (scene, config, key, createCallbackConfig) {
    var gameObject = GetValue(config, key);
    if (IsFunction(gameObject)) {
        var callback = gameObject;
        gameObject = callback(scene, createCallbackConfig);        
    }

    return gameObject;
}

export default GetGameObjectFromConfig;