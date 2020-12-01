import InversePostFxPipeline from './inversepipeline.js';
import AddPostFxPipeline from './utils/renderer/AddPostFxPipeline.js'
import SetValue from './utils/object/SetValue.js';

class InversePipelinePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        this.game.renderer.pipelines.addPostPipeline('rexInversePostFx', InversePostFxPipeline);
    }

    add(gameObject, config) {
        var pipeline = AddPostFxPipeline(InversePostFxPipeline, gameObject);
        pipeline.resetFromJSON(config);
        return pipeline;
    }

    remove(gameObject) {
        gameObject.removePostPipeline(InversePostFxPipeline);        
    }

}

SetValue(window, 'RexPlugins.Pipelines.InversePostFx', InversePostFxPipeline);

export default InversePipelinePlugin;