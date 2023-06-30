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
                parent.setCurrentImageMaskEnable(true, true);
                parent.setNextImageMaskEnable(true, true);
            },
            onProgress: function (parent, currentImage, nextImage, t) {
                if (t < 0.5) {
                    if (nextImage.visible) {
                        parent.setChildVisible(nextImage, false);
                    }

                    t = Yoyo(t);
                    parent.maskGameObject.setValue(t);

                } else {
                    if (currentImage.visible) {
                        parent.setChildVisible(currentImage, false);
                    }
                    if (!nextImage.visible) {
                        parent.setChildVisible(nextImage, true);
                    }

                    t = Yoyo(t);
                    parent.maskGameObject.setValue(t);
                }
            },
            onComplete: function (parent, currentImage, nextImage, t) {
                parent.removeMaskGameObject(false);
                parent.setChildVisible(currentImage, true);
            },
        })
}

export default AddCurtainMode;