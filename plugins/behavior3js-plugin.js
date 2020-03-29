import ObjectFactory from './logic/behavior3js/ObjectFactory.js';
import Factory from './logic/behavior3js/Factory.js';

class Behavior3jsPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        this.add = new ObjectFactory();
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

export default Behavior3jsPlugin;