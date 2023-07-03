import {
    Fade, CrossFade
} from './Const.js';
import Yoyo from './Yoyo.js';

var AddFadeModes = function (image) {
    image
        .addTransitionMode(Fade, {
            ease: 'Linear', dir: 'out', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.tint = 0;  // Turn nextImage to black
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var tintGray;
                if (t < 0.5) {
                    t = Yoyo(t);
                    tintGray = Math.floor(255 * (1 - t));
                    currentImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
                } else {
                    if (currentImage.visible) {
                        parent.setChildVisible(currentImage, false);
                    }

                    t = Yoyo(t);
                    tintGray = Math.floor(255 * (1 - t));
                    nextImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
                }
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildVisible(currentImage, true);
                currentImage.tint = 0xffffff;

                parent.setChildVisible(nextImage, true);
                nextImage.tint = 0xffffff;
            },
        })
        .addTransitionMode(CrossFade, {
            ease: 'Linear', dir: 'out', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalAlpha(currentImage, 1 - t);
                parent.setChildLocalAlpha(nextImage, t);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalAlpha(currentImage, 1)
            },
        })

}

export default AddFadeModes;