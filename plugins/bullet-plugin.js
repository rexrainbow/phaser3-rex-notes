import Bullet from './bullet.js';

import { Plugins as PhaserPlugins } from 'phaser';
class BulletPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Bullet(gameObject, config);
    }

}

export default BulletPlugin;