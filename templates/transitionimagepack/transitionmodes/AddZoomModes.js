import {
    ZoomOut, ZoomIn, ZoomInOut
} from './Const.js';
import Yoyo from './Yoyo.js';

var AddZoomModes = function (image) {
    image
        .addTransitionMode(ZoomOut, {
            ease: 'Linear', dir: 'out', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var scale = 1 - t;
                parent.setChildLocalScale(currentImage, scale, scale);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalScale(currentImage, 1, 1);
            },
        })
        .addTransitionMode(ZoomIn, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var scale = t;
                parent.setChildLocalScale(nextImage, scale, scale);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalScale(nextImage, 1, 1);
            },
        })
        .addTransitionMode(ZoomInOut, {
            ease: 'Linear', dir: 'out', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.tint = 0;  // Turn nextImage to black
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var scale;
                if (t < 0.5) {
                    scale = 1 - Yoyo(t);
                    parent.setChildLocalScale(currentImage, scale, scale);
                } else {
                    if (currentImage.visible) {
                        parent.setChildVisible(currentImage, false);
                    }

                    scale = 1 - Yoyo(t);
                    parent.setChildLocalScale(nextImage, scale, scale);
                }
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalScale(currentImage, 1, 1);
                parent.setChildVisible(currentImage, true);
                currentImage.tint = 0xffffff;

                parent.setChildLocalScale(nextImage, 1, 1);
                parent.setChildVisible(nextImage, true);
                nextImage.tint = 0xffffff;
            },
        })


}

export default AddZoomModes;