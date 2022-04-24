const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class Live2dBaseFile extends Phaser.Loader.File {
    constructor(loader, key, url, xhrSettings) {
        if (IsPlainObject(key)) {
            var config = key;

            key = GetFastValue(config, 'key');
            url = GetFastValue(config, 'url');
            xhrSettings = GetFastValue(config, 'xhrSettings');
        }

        var fileConfig = {
            type: 'live2d',
            cache: loader.cacheManager.custom.live2d,
            responseType: 'arraybuffer',
            key: key,
            url: url,
            xhrSettings: xhrSettings,
        };

        super(loader, fileConfig);
    }

    onProcess() {
        this.data = this.xhrLoader.response; // Array buffer

        this.state = Phaser.Loader.FILE_PROCESSING;
        this.onProcessComplete();
    }
}

export default Live2dBaseFile;