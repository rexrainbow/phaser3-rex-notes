
'use strict'

import loaderCallback from './webfontloader/webFontLoaderCallback.js';

class WebFontLoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexWebFont', loaderCallback);
    }

    addToScene(scene) {
        scene.sys.load['rexWebFont'] = loaderCallback;
    }
}

export default WebFontLoaderPlugin;