import CursorAtBounds from './cursoratbounds';

import { Plugins as PhaserPlugins } from 'phaser';
class CursorAtBoundsPlugin extends PhaserPlugins.BasePlugin {
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
        return new CursorAtBounds(scene, config);
    }

}

export default CursorAtBoundsPlugin;