import GlowFilterPostFxPipeline from './glowfilter2pipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class GlowFilterPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(GlowFilterPostFxPipeline, 'rexGlowFilter2PostFx');
    }
    
    setQuality(value) {
        GlowFilterPostFxPipeline.setQuality(value);
        return this;
    }

    set quality(value) {
        this.setQuality(value);
    }

    get quality() {
        return GlowFilterPostFxPipeline.getQuality();
    }
        
    setDistance(value) {
        GlowFilterPostFxPipeline.setDistance(value);
        return this;
    }

    set distance(value) {
        this.setDistance(value);
    }

    get distance() {
        return GlowFilterPostFxPipeline.getDiatance();
    }
}

SetValue(window, 'RexPlugins.Pipelines.GlowFilter2PostFx', GlowFilterPostFxPipeline);

export default GlowFilterPipelinePlugin;