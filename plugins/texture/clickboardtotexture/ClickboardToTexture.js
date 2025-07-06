import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import ClickboardPaster from '../../utils/clickboard/ClickboardPaster.js';
import FileObjectToCache from '../../utils/loader/FileObjectToCache.js';

class ClickboardToTexture extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        var self = this;
        var onPaste = function (file) {
            self.file = file;
            self.emit('paste', self);
        }
        this.clickboardPaster = new ClickboardPaster('image', onPaste);
    }

    saveTexture(key, onComplete) {
        FileObjectToCache(this.scene, this.file, 'image', key, undefined, onComplete);
        return this;
    }

    saveTexturePromise(key) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var onComplete = function () {
                resolve()
            }
            FileObjectToCache(self.scene, self.file, 'image', key, undefined, onComplete);
        });
    }

    releaseFile() {
        this.file = null;
        return this;
    }

    destroy() {
        this.clickboardPaster.destroy();
        this.clickboardPaster = null;
        this.file = null;
    }
}

export default ClickboardToTexture;