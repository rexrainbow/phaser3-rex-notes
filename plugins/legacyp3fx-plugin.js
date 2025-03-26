import InstallFilters from './behaviors/legacyp3fx/InstallFilters.js';

class LegacyP3FXPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        console.log('LegacyP3FXPlugin.start')
        eventEmitter.once('ready', function () {
            console.log('InstallFilters')
            InstallFilters(this.game);
        }, this)
    }
}

export default LegacyP3FXPlugin;