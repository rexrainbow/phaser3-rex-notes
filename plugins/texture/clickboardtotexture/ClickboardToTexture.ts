import ComponentBase from '../../utils/componentbase/ComponentBase';
import ClickboardPaster from '../../utils/clickboard/ClickboardPaster';
import FileObjectToCache from '../../utils/loader/FileObjectToCache';

class ClickboardToTexture extends ComponentBase {
    clickboardPaster: any;
    file: any;
    scene: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        var self = this;
        var onPaste = function(file?: any) {
            self.file = file;
            self.emit('paste', self);
        }
        this.clickboardPaster = new ClickboardPaster('image', onPaste);
    }

    saveTexture(key?: any, onComplete?: any) {
        FileObjectToCache(this.scene, this.file, 'image', key, undefined, onComplete);
        return this;
    }

    saveTexturePromise(key?: any) {
        var self = this;
        return new Promise(function(resolve?: any, reject?: any) {
            var onComplete = function() {
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