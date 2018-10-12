import Boids from './boids.js';

class BoidsPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    add(gameObject, config) {
        return new Boids(gameObject, config);
    }
}
export default BoidsPlugin;