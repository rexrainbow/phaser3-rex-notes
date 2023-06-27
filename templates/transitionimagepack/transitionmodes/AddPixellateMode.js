import {
    Pixellate
} from './Modes.js';

var AddPixellateMode = function (image) {
    image
        .addTransitionMode(Pixellate, {
            ease: 'Linear', dir: 'out', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                currentImage.effect = currentImage.preFX.addPixelate(0);
                nextImage.effect = nextImage.preFX.addPixelate(0);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                if (t < 0.5) {
                    t = t * 2;
                    var maxAmount = Math.min(currentImage.width, currentImage.height) / 5;
                    currentImage.effect.amount = Math.ceil(maxAmount * t);
                } else {
                    if (currentImage.visible) {
                        parent.setChildVisible(currentImage, false);
                    }

                    t = (t - 0.5) * 2;
                    var maxAmount = Math.min(nextImage.width, nextImage.height) / 5;
                    nextImage.effect.amount = Math.ceil(maxAmount * (1 - t));
                }
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                currentImage.preFX.remove(currentImage.effect);
                delete currentImage.effect;
                parent.setChildVisible(currentImage, true);

                nextImage.preFX.remove(nextImage.effect);
                delete nextImage.effect;
            },
        })

}

export default AddPixellateMode;