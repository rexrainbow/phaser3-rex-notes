import LoadingProgress from './loadingprogress';

import { Plugins as PhaserPlugins } from 'phaser';
class LoadingProgressPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    add(gameObject?: any, config?: any) {
        return new LoadingProgress(gameObject, config);
    }
}

export default LoadingProgressPlugin;