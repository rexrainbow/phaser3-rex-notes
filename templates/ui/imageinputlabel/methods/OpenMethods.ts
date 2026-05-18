// Note: Not working in iOS9+

import { OpenFileChooser } from '../../filechooser/FileChooser';
import FileChooserConfig from './FileChooserConfig';
import OnSelectFile from './OnSelectFile';

export default {
    async openPromise() {
        var self = this;

        return OpenFileChooser(this.scene.game, FileChooserConfig)
            .then(function(result?: any) {
                return OnSelectFile(self, result.files);
            })
    },

    open() {
        this.openPromise();
        return this;
    },

    setClickOpenEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }

        if (this.clickBehavior) {
            this.clickBehavior.setEnable(enable);
        }

        if (this.fileChooser) {
            this.fileChooser.setOpenEnable(enable)
        }

        return this;
    },
}