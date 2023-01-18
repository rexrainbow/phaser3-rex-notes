var FileObjectToCache = function (scene, file, loaderType, key, cacheType, onComplete) {
    if (cacheType === undefined) {
        cacheType = GetDefaultCacheType(loaderType);
    }

    var cache = scene.cache[cacheType];
    cache.remove(key);

    var url = window.URL.createObjectURL(file);

    var loader = scene.load;
    if (onComplete) {
        loader.once(`filecomplete-${loaderType}-${key}`, function (key, type, file) {
            onComplete(file);
        })
    }
    loader[loaderType](key, url);
    loader.start();
}

var GetDefaultCacheType = function (loaderType) {
    switch (loaderType) {
        case 'image':
        case 'svg':
            return 'textures';

        case 'animation':
            return 'json';

        case 'tilemapTiledJSON':
        case 'tilemapCSV':
            return 'tilemap';

        case 'glsl':
            return 'shader';

        default: return loaderType;
    }
}

export default FileObjectToCache;