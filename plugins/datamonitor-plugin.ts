import AddDataMonitor from './datamonitor';

import { Plugins as PhaserPlugins } from 'phaser';
class DataMonitorPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config?: any) {
        return AddDataMonitor(config);
    }
}

export default DataMonitorPlugin;