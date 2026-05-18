import FileObjectToCache from '../../../utils/loader/FileObjectToCache';

var LoadFile = function(file?: any, loaderType?: any, key?: any, cacheType?: any, onComplete?: any) {
    var scene = this.scene;
    FileObjectToCache(scene, file, loaderType, key, cacheType, onComplete);

    return this;
}

var LoadFilePromise = function(file?: any, loaderType?: any, key?: any, cacheType?: any) {
    var scene = this.scene;
    return new Promise(function(resolve?: any, reject?: any) {
        var onComplete = function(data?: any) {
            resolve(data)
        }
        FileObjectToCache(scene, file, loaderType, key, cacheType, onComplete);
    });
}

export default {
    loadFile: LoadFile,
    loadFilePromise: LoadFilePromise,
}