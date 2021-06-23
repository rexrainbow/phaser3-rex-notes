import SeparatorPostFxPipeline from './separatorpipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class SeparatorPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(SeparatorPostFxPipeline, 'rexSeparatorPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.SeparatorPostFx', SeparatorPostFxPipeline);

export default SeparatorPipelinePlugin;