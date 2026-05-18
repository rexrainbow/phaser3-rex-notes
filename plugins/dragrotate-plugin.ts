import DragRotate from './dragrotate';

import { Plugins as PhaserPlugins } from 'phaser';
class DragRotatePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene?: any, config?: any) {
        return new DragRotate(scene, config);
    }

}

export default DragRotatePlugin;