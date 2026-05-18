import LoaderCallback from './loader/webfontloader/WebFontLoaderCallback';

import { Plugins as PhaserPlugins } from 'phaser';
class WebFontLoaderPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager?: any) {
        super(pluginManager);

        pluginManager.registerFileType('rexWebFont', LoaderCallback);
    }

    addToScene(scene?: any) {
        scene.sys.load.rexWebFont = LoaderCallback;
    }
}

export default WebFontLoaderPlugin;