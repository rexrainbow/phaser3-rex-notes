
import loaderCallback from './loader/scripttag/scriptTagLoaderCallback.js';

class AwaitLoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexScriptTag', loaderCallback);
    }

    addToScene(scene) {
        scene.sys.load['rexScriptTag'] = loaderCallback;
    }
}

export default AwaitLoaderPlugin;