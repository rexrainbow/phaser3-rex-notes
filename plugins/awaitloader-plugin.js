
import loaderCallback from './loader/awaitloader/awaitLoaderCallback.js';

class AwaitLoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexAwait', loaderCallback);
    }

    addToScene(scene) {
        scene.sys.load['rexAwait'] = loaderCallback;
    }
}

export default AwaitLoaderPlugin;