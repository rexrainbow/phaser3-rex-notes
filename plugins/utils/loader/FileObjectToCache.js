import GetCache from '../system/GetCache.js';

var FileObjectToCache = function (scene, file, loaderType, key, cacheType, onComplete) {    
    var cache = GetCache(scene, loaderType, cacheType);
    if (cache.exists(key)) {
        cache.remove(key);
    }

    var url = window.URL.createObjectURL(file);

    var loader = scene.load;
    if (onComplete) {
        loader.once(`filecomplete-${loaderType}-${key}`, function (key, type, data) {
            onComplete(data);
        })
    }
    loader[loaderType](key, url);
    loader.start();
}

export default FileObjectToCache;