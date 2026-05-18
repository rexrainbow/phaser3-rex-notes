import IsSceneObject from '../system/IsSceneObject';

var LoadCompletePromise = function(scene?: any, config?: any) {
    var type = config.type;
    delete config.type;
    var key = config.key;

    return new Promise(function(resolve?: any, reject?: any) {
        var loader;
        if (IsSceneObject(scene)) {
            loader = scene.load[type](config);
        } else {
            loader = scene;
        }

        loader.on(`filecomplete-${type}-${key}`, function(key?: any, type?: any, data?: any) {
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