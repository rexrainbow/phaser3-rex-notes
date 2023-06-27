import {
    Fade
} from './Const.js';

var AddFadeMode = function (image) {
    image
        .addTransitionMode(Fade, {
            ease: 'Linear', dir: 'out', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var tintGray;
                if (t < 0.5) {
                    if (nextImage.visible) {
                        parent.setChildVisible(nextImage, false);
                    }

                    t = t * 2;
                    tintGray = Math.floor(255 * (1 - t));
                    currentImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
                } else {
                    if (currentImage.visible) {
                        parent.setChildVisible(currentImage, false);
                    }
                    if (!nextImage.visible) {
                        parent.setChildVisible(nextImage, true);
                    }

                    t = (t - 0.5) * 2;
                    tintGray = Math.floor(255 * t);
                    nextImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
                }
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                currentImage.tint = 0xffffff;
                parent.setChildVisible(currentImage, true);

                nextImage.tint = 0xffffff;
            },
        })

}

export default AddFadeMode;