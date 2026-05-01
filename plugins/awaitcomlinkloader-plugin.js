import LoaderCallback from './loader/awaitcomlink/AwaitComlinkCallback.js';

import { Plugins as PhaserPlugins } from 'phaser';
class AwaitComlinkLoaderPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexAwaitComlink', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load.rexAwaitComlink = LoaderCallback;
    }
}

export default AwaitComlinkLoaderPlugin;