import Scroller from './scroller';

import { Plugins as PhaserPlugins } from 'phaser';
class ScrollerPlugin extends PhaserPlugins.BasePlugin {
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
        return new Scroller(gameObject, config);
    }

}

export default ScrollerPlugin;