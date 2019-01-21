import SwirlPipeline from './swirlpipeline.js';

class SwirlPipelinePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(scene, key, config) {
        return new SwirlPipeline(scene, key, config);
    }

}

export default SwirlPipelinePlugin;