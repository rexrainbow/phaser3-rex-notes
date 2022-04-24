import Live2dFile from './Live2dFile.js';

var Live2dFileCallback = function (key, url) {
    if (Array.isArray(key)) {
        for (var i = 0; i < key.length; i++) {
            this.addFile(new Live2dFile(this, key[i]));
        }
    } else {
        this.addFile(new Live2dFile(this, key, url));
    }

    return this;
}

export default Live2dFileCallback;