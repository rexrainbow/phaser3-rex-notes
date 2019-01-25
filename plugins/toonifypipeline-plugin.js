import ToonifyPipeline from './toonifypipeline.js';

class ToonifyPipelinePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(scene, key, config) {
        return new ToonifyPipeline(scene, key, config);
    }

}

export default ToonifyPipelinePlugin;