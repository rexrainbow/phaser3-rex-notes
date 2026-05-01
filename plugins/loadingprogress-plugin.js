import LoadingProgress from './loadingprogress.js';

import { Plugins as PhaserPlugins } from 'phaser';
class LoadingProgressPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    add(gameObject, config) {
        return new LoadingProgress(gameObject, config);
    }
}

export default LoadingProgressPlugin;