import RotateTo from './rotateto';

import { Plugins as PhaserPlugins } from 'phaser';
class RotateToPlugin extends PhaserPlugins.BasePlugin {
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
        return new RotateTo(gameObject, config);
    }
}

export default RotateToPlugin;