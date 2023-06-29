import {
    SlideLeft, SlideRight, SlideUp, SlideDown,
} from './Const.js';

var AddSlideModes = function (image) {
    image
        .addTransitionMode(SlideRight, {
            ease: 'Linear', dir: 'in', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var x = nextImage.width * (t - 1);
                parent.setChildLocalPosition(nextImage, x, 0);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalPosition(nextImage, 0, 0);
            },
        })
        .addTransitionMode(SlideLeft, {
            ease: 'Linear', dir: 'in', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var x = nextImage.width * (1 - t);
                parent.setChildLocalPosition(nextImage, x, 0);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalPosition(nextImage, 0, 0);
            },
        })
        .addTransitionMode(SlideDown, {
            ease: 'Linear', dir: 'in', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var y = nextImage.height * (t - 1);
                parent.setChildLocalPosition(nextImage, 0, y);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalPosition(nextImage, 0, 0);
            },
        })
        .addTransitionMode(SlideUp, {
            ease: 'Linear', dir: 'in', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var y = nextImage.height * (1 - t);
                parent.setChildLocalPosition(nextImage, 0, y);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalPosition(nextImage, 0, 0);
            },
        })
}

export default AddSlideModes;