import AddTintRGBProperties from './tintrgb';

import { Plugins as PhaserPlugins } from 'phaser';
class TintRGBPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject?: any, tintRGB?: any) {
        return AddTintRGBProperties(gameObject, tintRGB)
    }
}

export default TintRGBPlugin;