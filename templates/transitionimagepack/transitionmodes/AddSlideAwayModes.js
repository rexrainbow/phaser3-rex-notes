import {
    SlideAwayLeft, SlideAwayRight, SlideAwayUp, SlideAwayDown
} from './Const.js';

var AddSlideAwayModes = function (image) {
    image
        .addTransitionMode(SlideAwayRight, {
            ease: 'Linear', dir: 'out', mask: true,

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
            ease: 'Linear', dir: 'out', mask: true,

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
            ease: 'Linear', dir: 'out', mask: true,

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
            ease: 'Linear', dir: 'out', mask: true,

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