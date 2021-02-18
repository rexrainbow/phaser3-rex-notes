import OutlinePostFxPipeline from './outlinepipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

class OutlinePipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(OutlinePostFxPipeline, 'rexOutlinePostFx');
    }

    setQuality(quality) {
        OutlinePostFxPipeline.setQuality(quality);
        return this;
    }

    set quality(value) {
        this.setQuality(value);
    }

    get quality() {
        return OutlinePostFxPipeline.getQuality();
    }
}

SetValue(window, 'RexPlugins.Pipelines.OutlinePostFx', OutlinePostFxPipeline);

export default OutlinePipelinePlugin;
