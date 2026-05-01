import LoaderCallback from './loader/awaitloader/AwaitLoaderCallback.js';

import { Plugins as PhaserPlugins } from 'phaser';
class AwaitLoaderPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexAwait', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load.rexAwait = LoaderCallback;
    }
}

export default AwaitLoaderPlugin;