import {
    IrisOut, IrisIn, IrisInOut
} from './Const.js';
import Yoyo from './Yoyo.js';
import CustomProgress from '../../../plugins/customprogress.js';

var CreateMask = function (scene) {
    var maskGameObject = new CustomProgress(scene, {
        type: 'Graphics',
        create: [
            { name: 'rect', type: 'rectangle' },
        ],
        update: function () {
            this.getShape('rect')
                .fillStyle(0xffffff)
                .setSize(this.width * this.value, this.height * this.value)
                .setCenterPosition(this.centerX, this.centerY);
        },
    })
    return maskGameObject;
}

var AddIrisModes = function (image) {
    var maskGameObject = CreateMask(image.scene);

    image
        .once('destroy', function () {
            maskGameObject.destroy();
        })
        .addTransitionMode(IrisOut, {
            ease: 'Linear', dir: 'out', mask: maskGameObject,

            onStart: function (parent, currentImage, nextImage, t) {
                parent.setCurrentImageMaskEnable(true, true);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                parent.maskGameObject.setValue(t);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.removeMaskGameObject(false);
            },
        })
        .addTransitionMode(IrisIn, {
            ease: 'Linear', dir: 'in', mask: maskGameObject,

            onStart: function (parent, currentImage, nextImage, t) {
                parent.setNextImageMaskEnable(true);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                parent.maskGameObject.setValue(1 - t);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.removeMaskGameObject(false);
            },
        })
        .addTransitionMode(IrisInOut, {
            ease: 'Linear', dir: 'out', mask: maskGameObject,

            onStart: function (parent, currentImage, nextImage, t) {
                parent.setChildVisible(nextImage, false);
                parent.setCurrentImageMaskEnable(true, true);
                parent.setNextImageMaskEnable(true);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                if (t < 0.5) {
                    t = Yoyo(t);
                    parent.maskGameObject.setValue(t);

                } else {
                    if (currentImage.visible) {
                        parent.setChildVisible(currentImage, false);
                    }
                    if (!nextImage.visible) {
                        parent.setChildVisible(nextImage, true);
                    }

                    t = Yoyo(t);
                    parent.maskGameObject.setValue(t);
                }
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.removeMaskGameObject(false);

                parent.setChildVisible(currentImage, true);
                parent.setChildVisible(nextImage, true);
            },
        })
}

export default AddIrisModes;