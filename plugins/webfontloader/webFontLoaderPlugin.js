'use strict'

import Phaser from 'phaser';
import WebFont from './../utils/webfontloader/webfontloader.js';

const FILE_POPULATED = Phaser.Loader.FILE_POPULATED;

class WebFontLoader extends Phaser.Loader.File {
    constructor(key, config) {
        var fileConfig = {
            type: 'webfont',
            key: key,
            url: '',
            config: config
        };

        super(fileConfig);
    }

    load(loader) {
        this.loader = loader;

        if (this.state === FILE_POPULATED) {
            this.onComplete();

            loader.nextFile(this);
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

Phaser.Loader.FileTypesManager.register('webFont', function (key, config) {
    this.addFile(new WebFontLoader(key, config));

    //  For method chaining
    return this;
});

export default WebFontLoader;