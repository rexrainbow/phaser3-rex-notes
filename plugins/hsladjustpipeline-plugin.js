import HslAdjustPipeline from './hsladjustpipeline.js';

class HslAdjustPipelinePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(scene, key, config) {
        return new HslAdjustPipeline(scene, key, config);
    }

}

export default HslAdjustPipelinePlugin;