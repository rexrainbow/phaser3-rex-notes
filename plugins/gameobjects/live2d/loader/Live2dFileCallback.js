import Live2dFile from './Live2dFile.js';

var Live2dFileCallback = function (key, url) {
    if (Array.isArray(key)) {
        for (var i = 0; i < key.length; i++) {
            var multifile = new Live2dFile(this, key[i]);
            this.addFile(multifile.files);
        }
    } else {
        var multifile = new Live2dFile(this, key, url);
        this.addFile(multifile.files);
    }

    return this;
}

export default Live2dFileCallback;