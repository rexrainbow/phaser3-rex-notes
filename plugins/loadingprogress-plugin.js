
import LoadingProgress from './loadingprogress.js';
import DelayPromise from './utils/promise/Delay.js'

class LoadingProgressPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    add(gameObject, config) {
        LoadingProgress(gameObject, config);
    }

    addDelayPromise(time) {
        return DelayPromise(time);
    }
}

export default LoadingProgressPlugin;