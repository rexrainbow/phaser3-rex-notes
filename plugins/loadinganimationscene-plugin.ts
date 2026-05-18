import LoaderCallback from './loader/awaitloader/AwaitLoaderCallback';
import StartLoadingAnimationScene from './loadinganimationscene';

import { Plugins as PhaserPlugins } from 'phaser';
class LoadingAnimationScenePlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager?: any) {
        super(pluginManager);

        pluginManager.registerFileType('rexAwait', LoaderCallback);
    }

    addToScene(scene?: any) {
        scene.sys.load.rexAwait = LoaderCallback;
    }

    startScene(scene?: any, animationSceneKey?: any, data?: any, onLoadingComplete?: any) {
        StartLoadingAnimationScene(scene, animationSceneKey, data, onLoadingComplete);
    }
}

export default LoadingAnimationScenePlugin;