import {
    Squares
} from './Const';
import CustomProgress from '../../../plugins/customprogress';

var CreateMask = function(scene?: any, columns?: any, rows?: any) {
    var maskGameObject = new CustomProgress(scene, {
        type: 'Graphics',
        create: {
            rectangle: columns * rows
        },
        update: function() {
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

var AddSquaresModes = function(image?: any) {
    var maskGameObject = CreateMask(image.scene, Math.ceil(image.width / 40), Math.ceil(image.height / 40));

    image
        .once('destroy', function() {
            maskGameObject.destroy();
        })
        .addTransitionMode(Squares, {
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

export default AddSquaresModes;