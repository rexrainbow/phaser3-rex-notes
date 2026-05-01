import LoaderCallback from './loader/webfontloader/WebFontLoaderCallback.js';

import { Plugins as PhaserPlugins } from 'phaser';
class WebFontLoaderPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexWebFont', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load.rexWebFont = LoaderCallback;
    }
}

export default WebFontLoaderPlugin;