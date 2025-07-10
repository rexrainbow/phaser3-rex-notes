import ParseYaml from '../../utils/yaml/ParseYaml.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const FILE_POPULATED = Phaser.Loader.FILE_POPULATED;
const FILE_PROCESSING = Phaser.Loader.FILE_PROCESSING;

class YAMLFile extends Phaser.Loader.File {
    constructor(loader, key, url, xhrSettings, dataKey) {
        var extension = 'yml';

        if (IsPlainObject(key)) {
            var config = key;

            key = GetFastValue(config, 'key');
            url = GetFastValue(config, 'url');
            xhrSettings = GetFastValue(config, 'xhrSettings');
            extension = GetFastValue(config, 'extension', extension);
            dataKey = GetFastValue(config, 'dataKey', dataKey);
        }

        var fileConfig = {
            type: 'json',
            cache: loader.cacheManager.json,
            extension: extension,
            responseType: 'text',
            key: key,
            url: url,
            xhrSettings: xhrSettings,
            config: dataKey
        };

        super(loader, fileConfig);

        //  A JSON object has been provided (instead of a URL), so we'll use it directly as the File.data. No need to load it.
        if (IsPlainObject(url)) {
            if (dataKey) {
                this.data = GetValue(url, dataKey);
            }
            else {
                this.data = url;
            }

            this.state = FILE_POPULATED;
        }
    }

    onProcess() {
        if (this.state !== FILE_POPULATED) {
            this.state = FILE_PROCESSING;

            try {
                var json = ParseYaml(this.xhrLoader.responseText);
            }
            catch (e) {
                this.onProcessError();

                throw e;
            }

            var key = this.config;

            if (typeof key === 'string') {
                this.data = GetValue(json, key, json);
            }
            else {
                this.data = json;
            }
        }

        this.onProcessComplete();
    }
}

export default YAMLFile;