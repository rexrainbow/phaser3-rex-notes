import Bullet from './bullet';

import { Plugins as PhaserPlugins } from 'phaser';
class BulletPlugin extends PhaserPlugins.BasePlugin {
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
        return new Bullet(gameObject, config);
    }

}

export default BulletPlugin;