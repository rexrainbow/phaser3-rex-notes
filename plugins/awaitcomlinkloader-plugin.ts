import LoaderCallback from './loader/awaitcomlink/AwaitComlinkCallback';

import { Plugins as PhaserPlugins } from 'phaser';
class AwaitComlinkLoaderPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager?: any) {
        super(pluginManager);

        pluginManager.registerFileType('rexAwaitComlink', LoaderCallback);
    }

    addToScene(scene?: any) {
        scene.sys.load.rexAwaitComlink = LoaderCallback;
    }
}

export default AwaitComlinkLoaderPlugin;