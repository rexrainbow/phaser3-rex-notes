import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import ClickboardPaster from '../../utils/clickboard/ClickboardPaster.js';
import FileObjectToCache from '../../utils/loader/FileObjectToCache.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ClickboardToTexture extends ComponentBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene, config);
        // this.scene

        this.setKey(GetValue(config, 'key'));

        var self = this;
        var onPaste = function (file) {
            FileObjectToCache(self.scene, file, 'image', self.key, undefined, function () {
                self.emit('paste', self.key);
            })
        }
        this.clickboardPaster = new ClickboardPaster('image', onPaste);
    }

    setKey(key) {
        this.key = key;
        return this;
    }

    destroy() {
        this.clickboardPaster.destroy();
        this.clickboardPaster = null;
    }
}

export default ClickboardToTexture;