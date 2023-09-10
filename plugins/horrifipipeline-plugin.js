import HorrifiPostFxPipeline from './horrifipipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class HorrifiPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(HorrifiPostFxPipeline, 'rexHorrifiPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.HorrifiPostFx', HorrifiPostFxPipeline);

export default HorrifiPipelinePlugin;