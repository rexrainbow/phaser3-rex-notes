import LoaderCallback from './loader/awaitloader/AwaitLoaderCallback';

import { Plugins as PhaserPlugins } from 'phaser';
class AwaitLoaderPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager?: any) {
        super(pluginManager);

        pluginManager.registerFileType('rexAwait', LoaderCallback);
    }

    addToScene(scene?: any) {
        scene.sys.load.rexAwait = LoaderCallback;
    }
}

export default AwaitLoaderPlugin;