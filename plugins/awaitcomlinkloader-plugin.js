import LoaderCallback from './loader/awaitcomlink/AwaitComlinkCallback.js';

class AwaitComlinkLoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexAwaitComlink', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load.rexAwaitComlink = LoaderCallback;
    }
}

export default AwaitComlinkLoaderPlugin;