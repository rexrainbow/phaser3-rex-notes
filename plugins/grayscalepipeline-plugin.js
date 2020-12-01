import GrayScalePostFxPipeline from './grayscalepipeline.js';
import AddPostFxPipeline from './utils/renderer/AddPostFxPipeline.js'
import SetValue from './utils/object/SetValue.js';

class GrayScalePipelinePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        this.game.renderer.pipelines.addPostPipeline('rexGrayScalePostFx', GrayScalePostFxPipeline);
    }

    add(gameObject, config) {
        var pipeline = AddPostFxPipeline(GrayScalePostFxPipeline, gameObject);
        pipeline.resetFromJSON(config);
        return pipeline;
    }

    remove(gameObject) {
        gameObject.removePostPipeline(GrayScalePostFxPipeline);        
    }

}

SetValue(window, 'RexPlugins.Pipelines.GrayScalePostFx', GrayScalePostFxPipeline);

export default GrayScalePipelinePlugin;