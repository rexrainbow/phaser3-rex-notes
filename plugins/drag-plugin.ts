import Drag from './drag';

import { Plugins as PhaserPlugins } from 'phaser';
class DragPlugin extends PhaserPlugins.BasePlugin {
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
        return new Drag(gameObject, config);
    }

}

export default DragPlugin;