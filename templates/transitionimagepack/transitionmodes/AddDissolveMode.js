import {
    Dissolve
} from './Const.js';

import { DissolveFilter, DissolveController } from '../../../plugins/dissolvefilter.js';
import RegisterFilter from '../../../plugins/utils/renderer/filterpluginbase/RegisterFilter.js';
import AddController from '../../../plugins/utils/renderer/filterpluginbase/AddController.js';
import RemoveController from '../../../plugins/utils/renderer/filterpluginbase/RemoveController.js';

var AddDissolveMode = function (image) {
    RegisterFilter(image.scene.game, DissolveFilter);

    image
        .addTransitionMode(Dissolve, {
            ease: 'Linear', dir: 'out', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                currentImage.effect = AddController(currentImage, DissolveController, {});
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                currentImage.effect.setProgress(t);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                RemoveController(currentImage, DissolveController);
                delete currentImage.effect;
            },
        })
}

export default AddDissolveMode;