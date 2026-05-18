import {
    SlideAwayLeft, SlideAwayRight, SlideAwayUp, SlideAwayDown
} from './Const';

var AddSlideAwayModes = function(image?: any) {
    image
        .addTransitionMode(SlideAwayRight, {
            ease: 'Linear', dir: 'out', mask: true,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                var x = currentImage.width * (t);
                parent.setChildLocalPosition(currentImage, x, 0);
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.setChildLocalPosition(currentImage, 0, 0);
            },
        })
        .addTransitionMode(SlideAwayLeft, {
            ease: 'Linear', dir: 'out', mask: true,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                var x = currentImage.width * (-t);
                parent.setChildLocalPosition(currentImage, x, 0);
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.setChildLocalPosition(currentImage, 0, 0);
            },
        })
        .addTransitionMode(SlideAwayDown, {
            ease: 'Linear', dir: 'out', mask: true,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                var y = currentImage.height * (t);
                parent.setChildLocalPosition(currentImage, 0, y);
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.setChildLocalPosition(currentImage, 0, 0);
            },
        })
        .addTransitionMode(SlideAwayUp, {
            ease: 'Linear', dir: 'out', mask: true,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                var y = currentImage.height * (-t);
                parent.setChildLocalPosition(currentImage, 0, y);
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.setChildLocalPosition(currentImage, 0, 0);
            },
        })

}

export default AddSlideAwayModes;