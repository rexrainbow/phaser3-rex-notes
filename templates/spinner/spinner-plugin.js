import ObjectFactory from './ObjectFactory.js';

import OrbitFactory from './orbit/Factory.js';
import LosFactory from './los/Factory.js';

class SpinnerPlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager) {
        super(scene, pluginManager);

        this.add = new ObjectFactory(scene);
    }

    start() {
        var eventEmitter = this.scene.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}
export default SpinnerPlugin;