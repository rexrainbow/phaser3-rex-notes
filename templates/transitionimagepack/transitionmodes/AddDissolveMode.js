import {
    Dissolve
} from './Const.js';
import DissolvePostFxPipeline from '../../../plugins/dissolvepipeline.js';
import RegisterPostPipeline from '../../../plugins/utils/renderer/postfxpipeline/RegisterPostPipeline.js';
import AddPostFxPipelineInstance from '../../../plugins/utils/renderer/postfxpipeline/AddPostFxPipelineInstance.js';
import RemovePostFxPipelineInstance from '../../../plugins/utils/renderer/postfxpipeline/RemovePostFxPipelineInstance.js';

var AddDissolveMode = function (image) {
    RegisterPostPipeline(image.scene.game, 'rexDissolvePostFx', DissolvePostFxPipeline);

    image
        .addTransitionMode(Dissolve, {
            ease: 'Linear', dir: 'out', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                currentImage.effect = AddPostFxPipelineInstance(currentImage, DissolvePostFxPipeline);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                currentImage.effect.setProgress(t);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                RemovePostFxPipelineInstance(currentImage, DissolvePostFxPipeline);
                delete currentImage.effect;
            },
        })
}

export default AddDissolveMode;