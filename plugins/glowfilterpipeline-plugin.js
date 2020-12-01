import GlowFilterPostFxPipeline from './glowfilterpipeline.js';
import AddPostFxPipeline from './utils/renderer/AddPostFxPipeline.js'
import SetValue from './utils/object/SetValue.js';

class GlowFilterPipelinePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        this.game.renderer.pipelines.addPostPipeline('rexGlowFilterPostFx', GlowFilterPostFxPipeline);
    }

    add(gameObject, config) {
        var pipeline = AddPostFxPipeline(GlowFilterPostFxPipeline, gameObject);
        pipeline.resetFromJSON(config);
        return pipeline;
    }

    remove(gameObject) {
        gameObject.removePostPipeline(GrayScalePostFxPipeline);        
    }

}

SetValue(window, 'RexPlugins.Pipelines.GlowFilterPostFx', GlowFilterPostFxPipeline);

export default GlowFilterPipelinePlugin;