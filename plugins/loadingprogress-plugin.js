
import LoadingProgress from './loadingprogress.js';

class LoadingProgressPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    add(gameObject, config) {
        LoadingProgress(gameObject, config);
    }
}

export default LoadingProgressPlugin;