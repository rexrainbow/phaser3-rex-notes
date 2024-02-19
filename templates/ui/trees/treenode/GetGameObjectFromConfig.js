import IsFunction from '../../../../plugins/utils/object/IsFunction.js';

var GetGameObjectFromConfig = function (tree, config, key, createCallbackData) {
    var gameObject = GetValue(config, key);
    if (IsFunction(gameObject)) {
        var callback = gameObject;
        gameObject = callback(tree.scene, createCallbackData);
        tree.syncDisplayList(gameObject);
    }

    return gameObject;
}

export default GetGameObjectFromConfig;