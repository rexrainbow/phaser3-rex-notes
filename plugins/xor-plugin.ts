import XOR from './xor';

import { Plugins as PhaserPlugins } from 'phaser';
class XORPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

// mixin
Object.assign(
    XORPlugin.prototype,
    XOR
);

export default XORPlugin;