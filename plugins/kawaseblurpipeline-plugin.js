import KawaseBlurFilterPostFxPipeline from './kawaseblurpipeline.js';
import BasePostFxPipelinePlugin from './utils/renderer/BasePostFxPipelinePlugin.js';
import SetValue from './utils/object/SetValue.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class KawaseBlurFilterPipelinePlugin extends BasePostFxPipelinePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        this.setPostPipelineClass(KawaseBlurFilterPostFxPipeline, 'rexKawaseBlurFilterPostFx');
    }

    add(gameObject, config) {
        if (config === undefined) {
            config = {};
        }
        var quality = GetValue(config, 'quality', 3);
        if (quality === 1) {  // Special mode
            return [super.add(gameObject, config)];
        } else {
            var kernels;
            if (config.hasOwnProperty('kernels')) {
                kernels = config.kernels;
            } else {
                kernels = [];
                var blur = GetValue(config, 'blur', 4);
                for (var i = quality; i > 0; i--) {
                    kernels.push(blur * (i / quality));
                }
            }

            var pipelines = [];
            for (var i = 0, cnt = kernels.length; i < cnt; i++) {
                config.blur = kernels[i];
                pipelines.push(
                    super.add(gameObject, config)
                );
            }

            return pipelines;
        }
    }
}

SetValue(window, 'RexPlugins.Pipelines.KawaseBlurFilterPostFx', KawaseBlurFilterPostFxPipeline);

export default KawaseBlurFilterPipelinePlugin;