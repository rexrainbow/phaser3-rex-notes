import NoiseDelayFadePostFxPipeline from './noisedelayfadepipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class NoiseDelayFadePipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(NoiseDelayFadePostFxPipeline, 'rexNoiseDelayFadePostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.NoiseDelayFadePostFx', NoiseDelayFadePostFxPipeline);

export default NoiseDelayFadePipelinePlugin;