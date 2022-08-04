import BaseSpriteFxPipelinePlugin from './utils/renderer/spritefxpipeline/BaseSpriteFxPipelinePlugin.js';
import HslAdjustSpriteFxPipeline from './hsladjustspritefxpipeline.js';
import HslAdjustSpriteFxPipelineControl from './shaders/hsladjust/spritefx/HslAdjustSpriteFxPipelineControl.js';
import SetValue from './utils/object/SetValue.js';

class HslAdjustSpriteFxPipelinePlugin extends BaseSpriteFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        this.setSpriteFxPipelineClass(
            HslAdjustSpriteFxPipeline,
            'rexHslAdjustSpriteFx',
            HslAdjustSpriteFxPipelineControl
        );
    }
}

SetValue(window, 'RexPlugins.Pipelines.HslAdjustSpriteFx', HslAdjustSpriteFxPipeline);

export default HslAdjustSpriteFxPipelinePlugin;