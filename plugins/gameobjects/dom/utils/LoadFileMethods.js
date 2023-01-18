import FileObjectToCache from '../../../utils/loader/FileObjectToCache';

var LoadFile = function (file, loaderType, key, cacheType) {
    if (typeof (file) === 'string') {
        cacheType = key;
        key = loaderType;
        loaderType = file;
        file = this.files[0];
    }
    if (!file) {
        return;
    }

    var scene = this.scene;
    FileObjectToCache(scene, file, loaderType, key, cacheType);

    return this;
}

var LoadFilePromise = function (file, loaderType, key, cacheType) {
    if (typeof (file) === 'string') {
        cacheType = key;
        key = loaderType;
        loaderType = file;
        file = this.files[0];
    }

    var scene = this.scene;
    return new Promise(function (resolve, reject) {
        if (!file) {
            resolve(null);
            return;
        }

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