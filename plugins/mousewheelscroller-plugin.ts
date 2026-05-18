import MouseWheelScroller from './mousewheelscroller';

import { Plugins as PhaserPlugins } from 'phaser';
class MouseWheelScrollerPlugin extends PhaserPlugins.BasePlugin {
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
        return new MouseWheelScroller(gameObject, config);
    }

}

export default MouseWheelScrollerPlugin;