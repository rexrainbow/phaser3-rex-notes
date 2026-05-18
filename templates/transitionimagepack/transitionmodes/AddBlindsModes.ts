import {
    Blinds
} from './Const';
import CustomProgress from '../../../plugins/customprogress';

var CreateMask = function(scene?: any, columns?: any) {
    var maskGameObject = new CustomProgress(scene, {
        type: 'Graphics',
        create: {
            rectangle: columns
        },
        update: function() {
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

var AddBlindsModes = function(image?: any) {
    var maskGameObject = CreateMask(image.scene, 10);

    image
        .once('destroy', function() {
            maskGameObject.destroy();
        })
        .addTransitionMode(Blinds, {
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

export default AddBlindsModes;