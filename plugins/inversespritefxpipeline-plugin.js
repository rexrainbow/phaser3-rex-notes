import BaseSpriteFxPipelinePlugin from './utils/renderer/spritefxpipeline/BaseSpriteFxPipelinePlugin.js';
import InverseSpriteFxPipeline from './inversespritefxpipeline.js';
import InverseSpriteFxPipelineControl from './shaders/inverse/spritefx/InverseSpriteFxPipelineControl.js';
import SetValue from './utils/object/SetValue.js';

class InverseSpriteFxPipelinePlugin extends BaseSpriteFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        this.setSpriteFxPipelineClass(
            InverseSpriteFxPipeline,
            'rexInverseSpriteFx',
            InverseSpriteFxPipelineControl
        );
    }
}

SetValue(window, 'RexPlugins.Pipelines.InverseSpriteFx', InverseSpriteFxPipeline);

export default InverseSpriteFxPipelinePlugin;