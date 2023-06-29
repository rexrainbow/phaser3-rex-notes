import {
    IrisOut, IrisIn
} from './Const.js';
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
            ease: 'Linear', dir: 'out', mask: maskGameObject,

            onStart: function (parent, currentImage, nextImage, t) {
                parent.setCurrentImageMaskEnable(true);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                parent.maskGameObject.setValue(1 - t);
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.removeMaskGameObject(false);
            },
        })

}

export default AddIrisModes;