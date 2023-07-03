import {
    Curtain
} from './Const.js';
import Yoyo from './Yoyo.js';
import CustomProgress from '../../../plugins/customprogress.js';

var CreateMask = function (scene, columns) {
    var maskGameObject = new CustomProgress(scene, {
        type: 'Graphics',
        create: {
            lines: columns
        },
        update: function () {
            var shapes = this.getShapes();
            var shapeWidth = this.width / columns;
            var radius = shapeWidth / 2;
            for (var i = 0; i < columns; i++) {
                var leftX = shapeWidth * i;
                var bottomY = this.height * this.value;
                var centerX = leftX + radius;
                shapes[i]
                    .fillStyle(0xffffff)
                    .start(leftX, 0)
                    .horizontalLineTo(bottomY)
                    .arc(centerX, bottomY, radius, 180, 0, true)
                    .horizontalLineTo(-bottomY)
                    .lineTo(leftX, 0)
                    .close();
            }
        },
    })
    return maskGameObject;
}

var AddCurtainMode = function (image) {
    var maskGameObject = CreateMask(image.scene, 10);

    image
        .once('destroy', function () {
            maskGameObject.destroy();
        })
        .addTransitionMode(Curtain, {
            ease: 'Linear', dir: 'out', mask: maskGameObject,

            onStart: function (parent, currentImage, nextImage, t) {
                nextImage.tint = 0;  // Turn nextImage to black
                parent.setCurrentImageMaskEnable(true, true);
                parent.setNextImageMaskEnable(true, true);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                var tintGray;
                if (t < 0.5) {
                    t = Yoyo(t);
                    tintGray = Math.floor(255 * (1 - t));
                    parent.maskGameObject.setValue(t);
                    currentImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;

                } else {
                    if (currentImage.visible) {
                        parent.setChildVisible(currentImage, false);
                    }

                    t = Yoyo(t);
                    tintGray = Math.floor(255 * (1 - t));
                    parent.maskGameObject.setValue(t);
                    nextImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
                }
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.removeMaskGameObject(false);

                parent.setChildVisible(currentImage, true);
                currentImage.tint = 0xffffff;

                parent.setChildVisible(nextImage, true);
                nextImage.tint = 0xffffff;
            },
        })
}

export default AddCurtainMode;