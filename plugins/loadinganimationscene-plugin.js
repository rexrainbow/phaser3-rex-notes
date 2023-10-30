import LoaderCallback from './loader/awaitloader/AwaitLoaderCallback.js';
import StartLoadingAnimationScene from './loadinganimationscene.js';

class LoadingAnimationScenePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('rexAwait', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load.rexAwait = LoaderCallback;
    }

    startScene(scene, animationSceneKey, data, onLoadingComplete) {
        StartLoadingAnimationScene(scene, animationSceneKey, data, onLoadingComplete);
    }
}

export default LoadingAnimationScenePlugin;