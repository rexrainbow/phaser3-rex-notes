import InstallFilters from './behaviors/legacyp3fx/InstallFilters.js';

class LegacyP3FXPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        if (this.game.isRunning) {
            InstallFilters(this.game);

        } else {
            eventEmitter.once('ready', function () {
                InstallFilters(this.game);
            }, this)

        }

    }
}

export default LegacyP3FXPlugin;