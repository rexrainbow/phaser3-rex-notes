import Boids from './boids';

import { Plugins as PhaserPlugins } from 'phaser';
class BoidsPlugin extends PhaserPlugins.BasePlugin {
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
        return new Boids(gameObject, config);
    }
}
export default BoidsPlugin;