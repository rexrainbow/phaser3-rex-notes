import SoundFade from './soundfade';

import { Plugins as PhaserPlugins } from 'phaser';
class SoundFadePlugin extends PhaserPlugins.BasePlugin {
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
    SoundFadePlugin.prototype,
    SoundFade
);

export default SoundFadePlugin;