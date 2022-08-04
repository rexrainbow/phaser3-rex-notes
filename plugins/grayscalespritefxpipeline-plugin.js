import BaseSpriteFxPipelinePlugin from './utils/renderer/spritefxpipeline/BaseSpriteFxPipelinePlugin.js';
import GrayScaleSpriteFxPipeline from './grayscalespritefxpipeline.js';
import GrayScaleSpriteFxPipelineControl from './shaders/grayscale/spritefx/GrayScaleSpriteFxPipelineControl.js';
import SetValue from './utils/object/SetValue.js';

class GrayScaleSpriteFxPipelinePlugin extends BaseSpriteFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        this.setSpriteFxPipelineClass(
            GrayScaleSpriteFxPipeline,
            'rexGrayScaleSpriteFx',
            GrayScaleSpriteFxPipelineControl
        );
    }
}

SetValue(window, 'RexPlugins.Pipelines.GrayScaleSpriteFx', GrayScaleSpriteFxPipeline);

export default GrayScaleSpriteFxPipelinePlugin;