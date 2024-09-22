import AddDataMonitor from './datamonitor';

class DataMonitorPlugin extends Phaser.Plugins.BasePlugin {
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