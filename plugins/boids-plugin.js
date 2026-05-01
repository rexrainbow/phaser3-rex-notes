import Boids from './boids.js';

import { Plugins as PhaserPlugins } from 'phaser';
class BoidsPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Boids(gameObject, config);
    }
}
export default BoidsPlugin;