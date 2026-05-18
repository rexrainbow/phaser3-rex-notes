import {
    PieOut, PieIn, PieInOut
} from './Const';
import Yoyo from './Yoyo';
import CustomProgress from '../../../plugins/customprogress';

var CreateMask = function(scene?: any) {
    var maskGameObject = new CustomProgress(scene, {
        type: 'Graphics',
        create: [
            { name: 'pie', type: 'arc' },
        ],
        update: function() {
            var radius = Math.max(this.width, this.height) * 2;
            var deltaAngle = 90 * this.value;

            this.getShape('pie')
                .fillStyle(0xffffff)
                .setCenterPosition(this.centerX, 0)
                .setRadius(radius)
                .setAngle(90 - deltaAngle, 90 + deltaAngle)
                .setPie();

        },
    })
    return maskGameObject;
}

var AddPieModes = function(image?: any) {
    var maskGameObject = CreateMask(image.scene);

    image
        .once('destroy', function() {
            maskGameObject.destroy();
        })
        .addTransitionMode(PieOut, {
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
        .addTransitionMode(PieIn, {
            ease: 'Linear', dir: 'in', mask: maskGameObject,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.setNextImageMaskEnable(true, true);
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.maskGameObject.setValue(1 - t);
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.removeMaskGameObject(false);
            },
        })
        .addTransitionMode(PieInOut, {
            ease: 'Linear', dir: 'out', mask: maskGameObject,

            onStart: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                nextImage.tint = 0;  // Turn nextImage to black
                parent.setCurrentImageMaskEnable(true);
                parent.setNextImageMaskEnable(true);
            },
            onProgress: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                var tintGray;
                if (t < 0.5) {
                    t = Yoyo(t);
                    tintGray = Math.floor(255 * (1 - t));
                    parent.maskGameObject.setValue(1 - t);
                    currentImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;

                } else {
                    if (currentImage.visible) {
                        parent.setChildVisible(currentImage, false);
                    }

                    t = Yoyo(t);
                    tintGray = Math.floor(255 * (1 - t));
                    parent.maskGameObject.setValue(1 - t);
                    nextImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
                }
            },
            onComplete: function(parent?: any, currentImage?: any, nextImage?: any, t?: any) {
                parent.removeMaskGameObject(false);

                parent.setChildVisible(currentImage, true);
                currentImage.tint = 0xffffff;

                parent.setChildVisible(nextImage, true);
                nextImage.tint = 0xffffff;
            },
        })

}

export default AddPieModes;