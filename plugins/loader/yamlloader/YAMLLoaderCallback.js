import YAMLFile from './YAMLFile.js';

var LoaderCallback = function (key, url, dataKey, xhrSettings) {
    if (Array.isArray(key)) {
        for (var i = 0; i < key.length; i++) {
            //  If it's an array it has to be an array of Objects, so we get everything out of the 'key' object
            this.addFile(new YAMLFile(this, key[i]));
        }
    }
    else {
        this.addFile(new YAMLFile(this, key, url, xhrSettings, dataKey));
    }

    return this;
}

export default LoaderCallback;