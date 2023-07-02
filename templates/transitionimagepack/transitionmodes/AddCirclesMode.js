import {
    Circles
} from './Const.js';
import CustomProgress from '../../../plugins/customprogress.js';

var CreateMask = function (scene, columns, rows) {
    var maskGameObject = new CustomProgress(scene, {
        type: 'Graphics',
        create: {
            circle: columns * rows
        },
        update: function () {
            var shapes = this.getShapes();
            var shapeHalfWidth = this.width / (columns - 1),
                shapeHelfHeight = this.height / rows;
            var shapeHeight = shapeHelfHeight * 2;
            var radius = Math.max(shapeHalfWidth, shapeHelfHeight) * this.value;
            for (var r = 0; r < rows; r++) {
                for (var c = 0; c < columns; c++) {
                    var centerX = c * shapeHalfWidth;
                    var centerY = r * shapeHeight + (c % 2) * shapeHelfHeight;
                    shapes[c * rows + r]
                        .fillStyle(0xffffff)
                        .setCenterPosition(centerX, centerY)
                        .setRadius(radius)
                }
            }
        },
    })
    return maskGameObject;
}

var AddCirclesMode = function (image) {
    var maskGameObject = CreateMask(image.scene, Math.ceil(image.width / 60), Math.ceil(image.height / 60));

    image
        .once('destroy', function () {
            maskGameObject.destroy();
        })
        .addTransitionMode(Circles, {
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

export default AddCirclesMode;