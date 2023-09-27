// Note: Not working in iOS9+

import { OpenFileChooser } from '../../filechooser/FileChooser.js';
import FileChooserConfig from './FileChooserConfig.js';
import OnSelectFile from './OnSelectFile.js';

export default {
    async openPromise() {
        var self = this;

        return OpenFileChooser(this.scene.game, FileChooserConfig)
            .then(function (result) {
                return OnSelectFile(self, result.files);
            })
    },

    open() {
        this.openPromise();
        return this;
    }
}