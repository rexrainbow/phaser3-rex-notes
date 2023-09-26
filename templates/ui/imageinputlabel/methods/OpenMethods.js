// Note: Not working in iOS9+

import { OpenFileChooser } from '../../filechooser/FileChooser.js';

export default {
    async openPromise() {
        var self = this;
        var imageBox = this.childrenMap.icon;
        var canvas = imageBox.image;

        return OpenFileChooser(this.scene.game, {
            accept: 'image/*',
            multiple: false,
        })
            .then(function (result) {
                var files = result.files;
                if (files.length === 0) {
                    return;
                }

                var selectedFile = files[0];
                return canvas.loadFromFilePromise(selectedFile)
                    .then(function () {
                        imageBox.scaleImage();

                        self.emit('select', selectedFile, self);
                    })
            })
    },

    open() {
        this.openPromise();
        return this;
    }
}