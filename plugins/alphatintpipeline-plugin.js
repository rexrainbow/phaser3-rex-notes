import AlphaTintPostFxPipeline from './alphatintpipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/postfxpipeline/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class BarrelPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(AlphaTintPostFxPipeline, 'rexAlphaTintPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.AlphaTintFx', AlphaTintPostFxPipeline);

export default BarrelPipelinePlugin;