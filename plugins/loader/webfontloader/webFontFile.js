import WebFont from '../../utils/webfontloader/webfontloader.js';

const FILE_POPULATED = Phaser.Loader.FILE_POPULATED;

class WebFontFile extends Phaser.Loader.File {
    constructor(loader, fileConfig) {
        super(loader, fileConfig);
    }

    load() {
        if (this.state === FILE_POPULATED) {
            //  Can happen for example in a JSONFile if they've provided a JSON object instead of a URL
            this.loader.nextFile(this, true);
        } else {
            // start loading task
            var config = this.config;
            config.active = this.onLoad.bind(this);
            config.inactive = this.onError.bind(this);
            config.fontactive = this.onFontActive.bind(this);
            config.fontinactive = this.onFontInactive.bind(this);
            WebFont.load(config);
        }
    }

    onLoad() {
        this.loader.nextFile(this, true);
    }

    onError() {
        this.loader.nextFile(this, false);
    }

    onFontActive(familyName, fvd) {
        this.loader.emit('webfontactive', this, familyName);
    }

    onFontInactive(familyName, fvd) {
        this.loader.emit('webfontinactive', this, familyName);
    }
}

export default WebFontFile;