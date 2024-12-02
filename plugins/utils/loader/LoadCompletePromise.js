var LoadCompletePromise = function (scene, config) {
    return new Promise(function (resolve, reject) {
        var type = config.type;
        delete config.type;
        var key = config.key;
        scene
            .load[type](config)
            .on(`filecomplete-${type}-${key}`, function (key, type, data) {
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