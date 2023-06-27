import {
    SlideAwayLeft, SlideAwayRight, SlideAwayUp, SlideAwayDown
} from './Modes.js';

var AddSlideAwayModes = function (image) {
    image
        .addTransitionMode(SlideAwayRight, {
            duration: 1000, ease: 'Linear', dir: 'out', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var x = currentImage.width * (t);
                parent.setChildLocalPosition(currentImage, x, 0);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalPosition(currentImage, 0, 0);
            },
        })
        .addTransitionMode(SlideAwayLeft, {
            duration: 1000, ease: 'Linear', dir: 'out', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var x = currentImage.width * (-t);
                parent.setChildLocalPosition(currentImage, x, 0);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalPosition(currentImage, 0, 0);
            },
        })
        .addTransitionMode(SlideAwayDown, {
            duration: 1000, ease: 'Linear', dir: 'out', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var y = currentImage.height * (t);
                parent.setChildLocalPosition(currentImage, 0, y);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalPosition(currentImage, 0, 0);
            },
        })
        .addTransitionMode(SlideAwayUp, {
            duration: 1000, ease: 'Linear', dir: 'out', mask: true,

            onStart: function (parent, currentImage, nextImage, t) {
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var y = currentImage.height * (-t);
                parent.setChildLocalPosition(currentImage, 0, y);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.setChildLocalPosition(currentImage, 0, 0);
            },
        })

}

export default AddSlideAwayModes;