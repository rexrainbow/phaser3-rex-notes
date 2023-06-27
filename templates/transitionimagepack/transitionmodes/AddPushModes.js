import {
    PushLeft, PushRight, PushUp, PushDown,
} from './Const.js';

var AddSliderModes = function (image) {
    image
        .addTransitionMode(PushRight, {
            ease: 'Linear', dir: 'out', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                // SlideAwayRight
                var x = currentImage.width * (t);
                parent.setChildLocalPosition(currentImage, x, 0);

                // SlideLeft
                var x = nextImage.width * (t - 1);
                parent.setChildLocalPosition(nextImage, x, 0);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalPosition(currentImage, 0, 0);
                parent.setChildLocalPosition(nextImage, 0, 0);
            },
        })
        .addTransitionMode(PushLeft, {
            ease: 'Linear', dir: 'out', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                // SlideAwayLeft
                var x = currentImage.width * (-t);
                parent.setChildLocalPosition(currentImage, x, 0);

                // SlideRight
                var x = nextImage.width * (1 - t);
                parent.setChildLocalPosition(nextImage, x, 0);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalPosition(currentImage, 0, 0);
                parent.setChildLocalPosition(nextImage, 0, 0);
            },
        })
        .addTransitionMode(PushDown, {
            ease: 'Linear', dir: 'out', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                // SlideAwayDown
                var y = currentImage.height * (t);
                parent.setChildLocalPosition(currentImage, 0, y);

                // SlideUp
                var y = nextImage.height * (t - 1);
                parent.setChildLocalPosition(nextImage, 0, y);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalPosition(currentImage, 0, 0);
                parent.setChildLocalPosition(nextImage, 0, 0);
            },
        })
        .addTransitionMode(PushUp, {
            ease: 'Linear', dir: 'out', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                // SlideAwayUp
                var y = currentImage.height * (-t);
                parent.setChildLocalPosition(currentImage, 0, y);

                // SlideDown
                var y = nextImage.height * (1 - t);
                parent.setChildLocalPosition(nextImage, 0, y);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalPosition(currentImage, 0, 0);
                parent.setChildLocalPosition(nextImage, 0, 0);
            },
        })

}

export default AddSliderModes;