import {
    RevealLeft, RevealRight, RevealUp, RevealDown,
} from './Const.js';

import { WipeFilter, WipeController } from '../../../plugins/wipefilter.js';
import RegisterFilter from '../../../plugins/utils/renderer/filterpluginbase/RegisterFilter.js';
import AddController from '../../../plugins/utils/renderer/filterpluginbase/AddController.js';
import RemoveController from '../../../plugins/utils/renderer/filterpluginbase/RemoveController.js';

const WipeWidth = 0.1;
const DirLeftToRight = 0;
const DirTopToBottom = 0;
const DirRightToLeft = 1;
const DirBottomToTop = 1;
const AxisX = 0;
const AxisY = 1;

var AddRevealModes = function (image) {
    RegisterFilter(image.scene.game, WipeFilter);

    image
        .addTransitionMode(RevealRight, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.effect = AddController(nextImage, WipeController, {
                    wipeWidth: WipeWidth,
                    direction: DirLeftToRight,
                    axis: AxisX,
                    reveal: true,
                });
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                nextImage.effect.progress = t;
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                RemoveController(nextImage, WipeController);
                delete nextImage.effect;
            },
        })
        .addTransitionMode(RevealLeft, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.effect = AddController(nextImage, WipeController, {
                    wipeWidth: WipeWidth,
                    direction: DirRightToLeft,
                    axis: AxisX,
                    reveal: true,
                });
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                nextImage.effect.progress = t;
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                RemoveController(nextImage, WipeController);
                delete nextImage.effect;
            },
        })
        .addTransitionMode(RevealDown, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.effect = AddController(nextImage, WipeController, {
                    wipeWidth: WipeWidth,
                    direction: DirTopToBottom,
                    axis: AxisY,
                    reveal: true,
                });
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                nextImage.effect.progress = t;
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                RemoveController(nextImage, WipeController);
                delete nextImage.effect;
            },
        })
        .addTransitionMode(RevealUp, {
            ease: 'Linear', dir: 'in', mask: false,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.effect = AddController(nextImage, WipeController, {
                    wipeWidth: WipeWidth,
                    direction: DirBottomToTop,
                    axis: AxisY,
                    reveal: true,
                });
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                nextImage.effect.progress = t;
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                RemoveController(nextImage, WipeController);
                delete nextImage.effect;
            },
        })

}

export default AddRevealModes;