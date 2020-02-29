import GrayScalePipeline from './grayscalepipeline.js';

class GrayScalePipelinePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, key, config) {
        return new GrayScalePipeline(scene, key, config);
    }

}

export default GrayScalePipelinePlugin;