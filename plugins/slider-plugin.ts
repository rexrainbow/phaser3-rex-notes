import Slider from './slider';

import { Plugins as PhaserPlugins } from 'phaser';
class SliderPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject?: any, config?: any) {
        return new Slider(gameObject, config);
    }

}

export default SliderPlugin;