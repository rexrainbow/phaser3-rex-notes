import {
    Diamonds
} from './Const';
import CustomProgress from '../../../plugins/customprogress';

var CreateMask = function(scene?: any, columns?: any, rows?: any) {
    var maskGameObject = new CustomProgress(scene, {
        type: 'Graphics',
        create: {
            lines: columns * rows
        },
        update: function() {
            var shapes = this.getShapes();
            var shapeHalfWidth = this.width / (columns - 1),
                shapeHelfHeight = this.height / rows;
            var shapeHeight = shapeHelfHeight * 2;
            var halfWidth = shapeHalfWidth * this.value,
                halfHeight = shapeHelfHeight * this.value;
            for (var r = 0; r < rows; r++) {
                for (var c = 0; c < columns; c++) {
                    var centerX = c * shapeHalfWidth;
                    var centerY = r * shapeHeight + (c % 2) * shapeHelfHeight;
                    shapes[c * rows + r]
                        .fillStyle(0xffffff)
                        .start(centerX + halfWidth, centerY)
                        .lineTo(centerX, centerY + halfHeight)
                        .lineTo(centerX - halfWidth, centerY)
                        .lineTo(centerX, centerY - halfHeight)
                        .lineTo(centerX + halfWidth, centerY)
                        .close();
                }
            }
        },
    })
    return maskGameObject;
}

var AddDiamondsMode = function(image?: any) {
    var maskGameObject = CreateMask(image.scene, Math.ceil(image.width / 60), Math.ceil(image.height / 60));

    image
        .once('destroy', function() {
            maskGameObject.destroy();
        })
        .addTransitionMode(Diamonds, {
            ease: 'Linear', dir: 'out', mask: maskGameObject,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.setCurrentImageMaskEnable(true, true);
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.maskGameObject.setValue(t);
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.removeMaskGameObject(false);
            },
        })
}

export default AddDiamondsMode;