'use strict'

import WebFontFile from './webFontFile.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class WebFontLoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexWebFont', this.load);
    }

    load(key, config) {
        if (IsPlainObject(key)) {
            config = key;
            if (config.hasOwnProperty('config')) {
                config.type = 'webfont';
                config.url = '';
            } else {
                config = {
                    key: 'webfont',
                    type: 'webfont',
                    url: '',
                    config: config
                };
            }
        } else {
            config = {
                type: 'webfont',
                url: '',
                key: key,
                config: config
            };
        }
        this.addFile(new WebFontFile(this, config));

        return this;
    }
}

export default WebFontLoaderPlugin;