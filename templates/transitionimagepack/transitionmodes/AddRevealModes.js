import {
    RevealLeft, RevealRight, RevealUp, RevealDown,
} from './Const.js';
import GetFilterList from '../../../plugins/utils/renderer/filterpluginbase/GetFilterList.js';

const WipeWidth = 0.1;
const DirLeftToRight = 0;
const DirTopToBottom = 1;
const DirRightToLeft = 1;
const DirBottomToTop = 0;
const AxisX = 0;
const AxisY = 1;

var AddRevealModes = function (image) {
    image
        .addTransitionMode(RevealRight, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.effect = GetFilterList(nextImage).addWipe(WipeWidth, DirLeftToRight, AxisX, 1);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                nextImage.effect.progress = t;
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                GetFilterList(nextImage).remove(nextImage.effect);
                delete nextImage.effect;
            },
        })
        .addTransitionMode(RevealLeft, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.effect = GetFilterList(nextImage).addWipe(WipeWidth, DirRightToLeft, AxisX, 1);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                nextImage.effect.progress = t;
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                GetFilterList(nextImage).remove(nextImage.effect);
                delete nextImage.effect;
            },
        })
        .addTransitionMode(RevealDown, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.effect = GetFilterList(nextImage).addWipe(WipeWidth, DirTopToBottom, AxisY, 1);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                nextImage.effect.progress = t;
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                GetFilterList(nextImage).remove(nextImage.effect);
                delete nextImage.effect;
            },
        })
        .addTransitionMode(RevealUp, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.effect = GetFilterList(nextImage).addWipe(WipeWidth, DirBottomToTop, AxisY, 1);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                nextImage.effect.progress = t;
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                GetFilterList(nextImage).remove(nextImage.effect);
                delete nextImage.effect;
            },
        })

}

export default AddRevealModes;
