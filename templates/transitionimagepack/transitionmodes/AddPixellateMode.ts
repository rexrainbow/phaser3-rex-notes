import {
    Pixellate
} from './Const';
import Yoyo from './Yoyo';
import GetFilterList from '../../../plugins/utils/renderer/filterpluginbase/GetFilterList';

var AddPixellateMode = function(image?: any) {
    image
        .addTransitionMode(Pixellate, {
            ease: 'Linear', dir: 'out', mask: true,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.setChildVisible(nextImage, false);
                currentImage.effect = GetFilterList(currentImage).addPixelate(0);
                nextImage.effect = GetFilterList(nextImage).addPixelate(0)
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
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
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                GetFilterList(currentImage).remove(currentImage.effect);
                delete currentImage.effect;
                parent.setChildVisible(currentImage, true);

                GetFilterList(nextImage).remove(nextImage.effect);
                delete nextImage.effect;
            },
        })

}

export default AddPixellateMode;