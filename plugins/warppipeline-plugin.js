import WarpPostFxPipeline from './warppipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class WarpPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(WarpPostFxPipeline, 'rexWarpPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.WarpPostFx', WarpPostFxPipeline);

export default WarpPipelinePlugin;