import {
    SlideLeft, SlideRight, SlideUp, SlideDown,
} from './Const';

var AddSlideModes = function(image?: any) {
    image
        .addTransitionMode(SlideRight, {
            ease: 'Linear', dir: 'in', mask: true,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                var x = nextImage.width * (t - 1);
                parent.setChildLocalPosition(nextImage, x, 0);
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.setChildLocalPosition(nextImage, 0, 0);
            },
        })
        .addTransitionMode(SlideLeft, {
            ease: 'Linear', dir: 'in', mask: true,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                var x = nextImage.width * (1 - t);
                parent.setChildLocalPosition(nextImage, x, 0);
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.setChildLocalPosition(nextImage, 0, 0);
            },
        })
        .addTransitionMode(SlideDown, {
            ease: 'Linear', dir: 'in', mask: true,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                var y = nextImage.height * (t - 1);
                parent.setChildLocalPosition(nextImage, 0, y);
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.setChildLocalPosition(nextImage, 0, 0);
            },
        })
        .addTransitionMode(SlideUp, {
            ease: 'Linear', dir: 'in', mask: true,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                var y = nextImage.height * (1 - t);
                parent.setChildLocalPosition(nextImage, 0, y);
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.setChildLocalPosition(nextImage, 0, 0);
            },
        })
}

export default AddSlideModes;