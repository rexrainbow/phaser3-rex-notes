export default {
    loadFromURL(url?: any, callback?: any) {
        var self = this;
        var img = new Image();
        img.onload = function() {
            if ((self.width !== img.width) || (self.height !== img.height)) {
                self.resize(img.width, img.height);
            } else {
                self.clear();
            }
            self.context.drawImage(img, 0, 0);
            self.updateTexture();

            if (callback?: any) {
                callback();
            }

            img.onload = null;
            img.src = '';
            img.remove();
        }
        img.src = url;
        return this;
    },

    loadFromURLPromise(url?: any) {
        var self = this;
        return new Promise(function(resolve?: any, reject?: any) {
            self.loadFromURL(url, resolve);
        });
    },

    loadFromFile(file?: any, callback?: any) {
        var url = URL.createObjectURL(file);
        this.loadFromURL(url, function() {
            URL.revokeObjectURL(url);
            if (callback?: any) {
                callback();
            }
        })

        return this;
    },

    loadFromFilePromise(file?: any) {
        var self = this;
        return new Promise(function(resolve?: any, reject?: any) {
            self.loadFromFile(file, resolve);
        });
    }
}