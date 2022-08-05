import WarpPostFxPipeline from './warppipeline.js';
import WarpPostFxPipelineBehavior from './warppipelinebehavior.js';
import BasePostFxPipelinePlugin from './warppipelinebehavior.js';
import SetValue from './utils/object/SetValue.js';

class WarpPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(WarpPostFxPipeline, 'rexWarpPostFx');
    }

    addBehavior(gameObject, config) {
        return new WarpPostFxPipelineBehavior(gameObject, config);
    }
}

SetValue(window, 'RexPlugins.Pipelines.WarpPostFx', WarpPostFxPipeline);

export default WarpPipelinePlugin;