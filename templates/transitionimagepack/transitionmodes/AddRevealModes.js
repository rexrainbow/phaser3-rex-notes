import {
    RevealLeft, RevealRight, RevealUp, RevealDown,
} from './Const.js';

const WipeWidth = 0.1;
const DirLeftToRight = 0;
const DirTopToBottom = 0;
const DirRightToLeft = 1;
const DirBottomToTop = 1;
const AxisX = 0;
const AxisY = 1;

var AddRevealModes = function (image) {
    image
        .addTransitionMode(RevealRight, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.effect = nextImage.preFX.addReveal(WipeWidth, DirLeftToRight, AxisX);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                nextImage.effect.progress = t;
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                nextImage.preFX.remove(nextImage.effect);
                delete nextImage.effect;
            },
        })
        .addTransitionMode(RevealLeft, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.effect = nextImage.preFX.addReveal(WipeWidth, DirRightToLeft, AxisX);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                nextImage.effect.progress = t;
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                nextImage.preFX.remove(nextImage.effect);
                delete nextImage.effect;
            },
        })
        .addTransitionMode(RevealDown, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.effect = nextImage.preFX.addReveal(WipeWidth, DirTopToBottom, AxisY);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                nextImage.effect.progress = t;
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                nextImage.preFX.remove(nextImage.effect);
                delete nextImage.effect;
            },
        })
        .addTransitionMode(RevealUp, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.effect = nextImage.preFX.addReveal(WipeWidth, DirBottomToTop, AxisY);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                nextImage.effect.progress = t;
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                nextImage.preFX.remove(nextImage.effect);
                delete nextImage.effect;
            },
        })

}

export default AddRevealModes;