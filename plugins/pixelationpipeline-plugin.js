import PixelationPipeline from './pixelationpipeline.js';

class PixelationPipelinePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(scene, key, config) {
        return new PixelationPipeline(scene, key, config);
    }

}

export default PixelationPipelinePlugin;