import InstallP3Fx from './p3fx.js';

class P3FXPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        if (this.game.isRunning) {
            InstallP3Fx(this.game);

        } else {
            eventEmitter.once('ready', function () {
                InstallP3Fx(this.game);
            }, this)

        }

    }
}

export default P3FXPlugin;