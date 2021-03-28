import BaseSpinner from '../base/BaseSpinner.js';
import { Arc, Circle } from '../utils/Geoms.js';
import Fold from '../utils/Fold.js';

const Linear = Phaser.Math.Linear;
const ExpoIn = Phaser.Math.Easing.Expo.In;

class Radio extends BaseSpinner {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerRadio';
    }

    buildShapes() {
        this.addShape((new Circle()).setName('center'));
        this.addShape((new Arc()).setName('arc0'));
        this.addShape((new Arc()).setName('arc1'));
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;

        var centerRadius = (radius * 2) / 6;
        var arcWidth = centerRadius;
        var x = centerX - radius + centerRadius;
        var y = centerY + radius - centerRadius;

        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var shape = shapes[i];

            var t = (this.value + ((cnt - i) * 0.1)) % 1;
            t = Fold(t);
            t = ExpoIn(t);

            switch (shape.name) {
                case 'center':
                    shape
                        .fillStyle(this.color, Linear(0.25, 1, t))
                        .setRadius(centerRadius)
                        .setCenterPosition(x, y);
                    break;
                case 'arc0':
                    shape
                        .lineStyle(arcWidth, this.color, Linear(0.25, 1, t))
                        .setRadius(centerRadius * 2.5)
                        .setCenterPosition(x, y)
                        .setAngle(270, 360);
                    break;
                case 'arc1':
                    shape
                        .lineStyle(arcWidth, this.color, Linear(0.25, 1, t))
                        .setRadius(centerRadius * 4.5)
                        .setCenterPosition(x, y)
                        .setAngle(270, 360);
                    break;
            }
        }

    }
}

export default Radio;