import {
    Blinds
} from './Const.js';
import CustomProgress from '../../../plugins/customprogress.js';

var CreateMask = function (scene, columns) {
    var maskGameObject = new CustomProgress(scene, {
        type: 'Graphics',
        create: {
            rectangle: columns
        },
        update: function () {
            var shapes = this.getShapes();
            var shapeWidth = this.width / columns;
            for (var i = 0; i < columns; i++) {
                shapes[i]
                    .fillStyle(0xffffff)
                    .setSize(shapeWidth * this.value, this.height)
                    .setTopLeftPosition(shapeWidth * i, 0);
            }
        },
    })
    return maskGameObject;
}

var AddBlindsModes = function (image) {
    var maskGameObject = CreateMask(image.scene, 10);

    image
        .once('destroy', function () {
            maskGameObject.destroy();
        })
        .addTransitionMode(Blinds, {
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
}

export default AddBlindsModes;