import InstallP3Fx from './p3fx.js';

import { Plugins as PhaserPlugins } from 'phaser';
class P3FXPlugin extends PhaserPlugins.BasePlugin {
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