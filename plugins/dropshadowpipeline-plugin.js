import DropShadowPostFxPipeline from './dropshadowpipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class DropShadowPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(DropShadowPostFxPipeline, 'rexDropShadowPostFx');
    }
}

SetValue(window, 'RexPlugins.Pipelines.DropShadowPostFx', DropShadowPostFxPipeline);

export default DropShadowPipelinePlugin;