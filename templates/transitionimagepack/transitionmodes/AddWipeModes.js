import {
    WipeLeft, WipeRight, WipeUp, WipeDown,
} from './Const.js';
import CustomProgress from '../../../plugins/customprogress.js';

var CreateMask = function (scene) {
    var maskGameObject = new CustomProgress(scene, {
        type: 'Graphics',
        create: [
            { name: 'rect', type: 'rectangle' },
        ],
        update: function () {
            var rect = this.getShape('rect')
                .fillStyle(0xffffff)

            var t = 1 - this.value;
            switch (this.wipeMode) {
                case 'right':
                    rect
                        .setSize(this.width * t, this.height)
                        .setTopLeftPosition(this.width - rect.width, 0);
                    break;

                case 'left':
                    rect
                        .setSize(this.width * t, this.height)
                        .setTopLeftPosition(0, 0);
                    break;

                case 'down':
                    rect
                        .setSize(this.width, this.height * t)
                        .setTopLeftPosition(0, this.height - rect.height);
                    break;

                case 'up':
                    rect
                        .setSize(this.width, this.height * t)
                        .setTopLeftPosition(0, 0);
                    break;
            }
        },
    })
    return maskGameObject;
}

var AddWipeModes = function (image) {
    var maskGameObject = CreateMask(image.scene);

    image
        .once('destroy', function () {
            maskGameObject.destroy();
        })
        .addTransitionMode(WipeRight, {
            ease: 'Linear', dir: 'out', mask: maskGameObject,

            onStart: function (parent, currentImage, nextImage, t) {
                parent.setCurrentImageMaskEnable(true);
                parent.maskGameObject.wipeMode = 'right';
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                parent.maskGameObject.setValue(t);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.removeMaskGameObject(false);
            },
        })
        .addTransitionMode(WipeLeft, {
            ease: 'Linear', dir: 'out', mask: maskGameObject,

            onStart: function (parent, currentImage, nextImage, t) {
                parent.setCurrentImageMaskEnable(true);
                parent.maskGameObject.wipeMode = 'left';
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                parent.maskGameObject.setValue(t);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.removeMaskGameObject(false);
            },
        })
        .addTransitionMode(WipeDown, {
            ease: 'Linear', dir: 'out', mask: maskGameObject,

            onStart: function (parent, currentImage, nextImage, t) {
                parent.setCurrentImageMaskEnable(true);
                parent.maskGameObject.wipeMode = 'down';
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                parent.maskGameObject.setValue(t);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.removeMaskGameObject(false);
            },
        })
        .addTransitionMode(WipeUp, {
            ease: 'Linear', dir: 'out', mask: maskGameObject,

            onStart: function (parent, currentImage, nextImage, t) {
                parent.setCurrentImageMaskEnable(true);
                parent.maskGameObject.wipeMode = 'up';
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                parent.maskGameObject.setValue(t);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.removeMaskGameObject(false);
            },
        })

}

export default AddWipeModes;