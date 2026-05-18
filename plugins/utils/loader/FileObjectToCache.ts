import GetCache from '../system/GetCache';
import IsFunction from '../object/IsFunction';

var FileObjectToCache = function(scene?: any, file?: any, loaderType?: any, key?: any, cacheType?: any, onComplete?: any) {
    // Remove data from cache
    if ((cacheType === null) || (cacheType === false)) {

    } else if (IsFunction(cacheType)) {
        cacheType();
    } else {
        var cache = GetCache(scene, loaderType, cacheType);
        if (cache.exists(key)) {
            cache.remove(key);
        }
    }

    // Add filecomplete event
    var loader = scene.load;
    if (onComplete?: any) {
        loader.once(`filecomplete-${loaderType}-${key}`, function(key?: any, type?: any, data?: any) {
            onComplete(data);
        })
    }

    // Load file from url
    if (IsFunction(file)) {
        file();
    } else {
        var url = window.URL.createObjectURL(file);
        loader[loaderType](key, url);
    }

    loader.start();
}

export default FileObjectToCache;