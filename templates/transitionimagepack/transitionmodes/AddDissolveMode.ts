import {
    Dissolve
} from './Const';

import { DissolveFilter, DissolveController } from '../../../plugins/dissolvefilter';
import RegisterFilter from '../../../plugins/utils/renderer/filterpluginbase/RegisterFilter';
import AddController from '../../../plugins/utils/renderer/filterpluginbase/AddController';
import RemoveController from '../../../plugins/utils/renderer/filterpluginbase/RemoveController';

var AddDissolveMode = function(image?: any) {
    RegisterFilter(image.scene.game, DissolveFilter);

    image
        .addTransitionMode(Dissolve, {
            ease: 'Linear', dir: 'out', mask: false,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                currentImage.effect = AddController(currentImage, DissolveController, {});
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                currentImage.effect.setProgress(t);
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                RemoveController(currentImage, DissolveController);
                delete currentImage.effect;
            },
        })
}

export default AddDissolveMode;