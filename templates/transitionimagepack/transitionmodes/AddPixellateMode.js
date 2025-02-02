import {
    Pixellate
} from './Const.js';
import Yoyo from './Yoyo.js';
import GetFilterList from '../../../plugins/utils/renderer/filterpluginbase/GetFilterList.js';

var AddPixellateMode = function (image) {
    image
        .addTransitionMode(Pixellate, {
            ease: 'Linear', dir: 'out', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
                parent.setChildVisible(nextImage, false);
                currentImage.effect = GetFilterList(currentImage).addPixelate(0);
                nextImage.effect = GetFilterList(nextImage).addPixelate(0)
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                if (t < 0.5) {
                    t = Yoyo(t);
                    var maxAmount = Math.min(currentImage.width, currentImage.height) / 5;
                    currentImage.effect.amount = Math.ceil(maxAmount * t);
                } else {
                    if (currentImage.visible) {
                        parent.setChildVisible(currentImage, false);
                    }
                    if (!nextImage.visible) {
                        parent.setChildVisible(nextImage, true);
                    }

                    t = Yoyo(t);
                    var maxAmount = Math.min(nextImage.width, nextImage.height) / 5;
                    nextImage.effect.amount = Math.ceil(maxAmount * t);
                }
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                GetFilterList(currentImage).remove(currentImage.effect);
                delete currentImage.effect;
                parent.setChildVisible(currentImage, true);

                GetFilterList(nextImage).remove(nextImage.effect);
                delete nextImage.effect;
            },
        })

}

export default AddPixellateMode;