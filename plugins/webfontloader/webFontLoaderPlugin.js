'use strict'

import WebFontFile from './webFontFile.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class WebFontLoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('webFont', function (key, config) {
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
                FILE_CONFIG.key = key;
                FILE_CONFIG.config = config;
                config = FILE_CONFIG;
            }
            this.addFile(new WebFontFile(this, config));

            return this;
        });
    }
}

var FILE_CONFIG = {
    type: 'webfont',
    url: ''
};

export default WebFontLoaderPlugin;