import CrtPostFxPipeline from './crtpipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class CrtPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(CrtPostFxPipeline, 'rexCrtPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.CrtPostFx', CrtPostFxPipeline);

export default CrtPipelinePlugin;