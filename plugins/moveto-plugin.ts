import MoveTo from './moveto';

import { Plugins as PhaserPlugins } from 'phaser';
class MoveToPlugin extends PhaserPlugins.BasePlugin {
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
        return new MoveTo(gameObject, config);
    }
}

export default MoveToPlugin;