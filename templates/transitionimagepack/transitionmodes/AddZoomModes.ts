import {
    ZoomOut, ZoomIn, ZoomInOut
} from './Const';
import Yoyo from './Yoyo';

var AddZoomModes = function(image?: any) {
    image
        .addTransitionMode(ZoomOut, {
            ease: 'Linear', dir: 'out', mask: false,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                var scale = 1 - t;
                parent.setChildLocalScale(currentImage, scale, scale);
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.setChildLocalScale(currentImage, 1, 1);
            },
        })
        .addTransitionMode(ZoomIn, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                var scale = t;
                parent.setChildLocalScale(nextImage, scale, scale);
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.setChildLocalScale(nextImage, 1, 1);
            },
        })
        .addTransitionMode(ZoomInOut, {
            ease: 'Linear', dir: 'out', mask: false,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                nextImage.tint = 0;  // Turn nextImage to black
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                var scale;
                if (t < 0.5) {
                    // Scale down current image
                    scale = 1 - Yoyo(t);
                    parent.setChildLocalScale(currentImage, scale, scale);
                } else {
                    if (currentImage.visible) {
                        parent.setChildVisible(currentImage, false);
                        nextImage.tint = 0xffffff;
                    }

                    scale = 1 - Yoyo(t);
                    parent.setChildLocalScale(nextImage, scale, scale);
                }
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
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