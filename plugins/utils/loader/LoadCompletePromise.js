import IsSceneObject from '../system/IsSceneObject.js';

var LoadCompletePromise = function (scene, config) {
    var type = config.type;
    delete config.type;
    var key = config.key;

    return new Promise(function (resolve, reject) {
        var loader;
        if (IsSceneObject(scene)) {
            loader = scene.load[type](config);
        } else {
            loader = scene;
        }

        loader.on(`filecomplete-${type}-${key}`, function (key, type, data) {
            resolve({
                key: key,
                type: type,
                data: data,
            });
        })
            .start()

    });
};

export default LoadCompletePromise;