import Swirlpipeline from './swirlpipeline.js';

class SwirlpipelinePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(scene, key, config) {
        return new Swirlpipeline(scene, key, config);
    }

}

export default SwirlpipelinePlugin;