import {
    ZoomOut, ZoomIn, ZoomInOut
} from './Const.js';

var AddZoomModes = function (image) {
    image
        .addTransitionMode(ZoomOut, {
            ease: 'Linear', dir: 'out', mask: true,

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
            ease: 'Linear', dir: 'in', mask: true,

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
            ease: 'Linear', dir: 'out', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
                parent.setChildVisible(nextImage, false);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var scale;
                if (t < 0.5) {
                    scale = 1 - (t * 2);
                    parent.setChildLocalScale(currentImage, scale, scale);
                } else {
                    if (currentImage.visible) {
                        parent.setChildVisible(currentImage, false);
                    }
                    if (!nextImage.visible) {
                        parent.setChildVisible(nextImage, true);
                    }

                    scale = (t - 0.5) * 2;
                    parent.setChildLocalScale(nextImage, scale, scale);
                }
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalScale(currentImage, 1, 1);
                parent.setChildVisible(currentImage, true);

                parent.setChildLocalScale(nextImage, 1, 1);
                parent.setChildVisible(nextImage, true);
            },
        })


}

export default AddZoomModes;