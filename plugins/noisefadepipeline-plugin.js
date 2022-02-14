import NoiseFadePostFxPipeline from './noisefadepipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class NoiseFadePipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(NoiseFadePostFxPipeline, 'rexNoiseFadePostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.NoiseFadePostFx', NoiseFadePostFxPipeline);

export default NoiseFadePipelinePlugin;