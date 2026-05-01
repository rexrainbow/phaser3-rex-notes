import AddDataMonitor from './datamonitor';

import { Plugins as PhaserPlugins } from 'phaser';
class DataMonitorPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return AddDataMonitor(config);
    }
}

export default DataMonitorPlugin;