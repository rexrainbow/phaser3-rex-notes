import {
    Squares
} from './Const.js';
import CustomProgress from '../../../plugins/customprogress.js';

var CreateMask = function (scene, columns, rows) {
    var maskGameObject = new CustomProgress(scene, {
        type: 'Graphics',
        create: {
            rectangle: columns * rows
        },
        update: function () {
            var shapes = this.getShapes();
            var shapeWidth = this.width / columns,
                shapeHeight = this.height / rows;
            for (var r = 0; r < rows; r++) {
                for (var c = 0; c < columns; c++) {
                    shapes[c * rows + r]
                        .fillStyle(0xffffff)
                        .setSize(shapeWidth * this.value, shapeHeight * this.value)
                        .setCenterPosition(shapeWidth * (c + 0.5), shapeHeight * (r + 0.5));
                }
            }
        },
    })
    return maskGameObject;
}

var AddBlindsModes = function (image) {
    var maskGameObject = CreateMask(image.scene, Math.ceil(image.width / 40), Math.ceil(image.height / 40));

    image
        .once('destroy', function () {
            maskGameObject.destroy();
        })
        .addTransitionMode(Squares, {
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