import FileObjectToCache from '../../../utils/loader/FileObjectToCache';

var LoadFile = function (file, loaderType, key, cacheType) {
    var scene = this.scene;
    FileObjectToCache(scene, file, loaderType, key, cacheType);

    return this;
}

var LoadFilePromise = function (file, loaderType, key, cacheType) {
    var scene = this.scene;
    return new Promise(function (resolve, reject) {    
        var onComplete = function (file) {
            resolve(file)
        }
        FileObjectToCache(scene, file, loaderType, key, cacheType, onComplete);
    });
}

export default {
    loadFile: LoadFile,
    loadFilePromise: LoadFilePromise,
}