import GrayScalepipeline from './grayscalepipeline.js';

class GrayScalepipelinePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(scene, key, config) {
        return new GrayScalepipeline(scene, key, config);
    }

}

export default GrayScalepipelinePlugin;