import BaseSpinner from '../base/BaseSpinner.js';
import { Circle } from '../../../plugins/gameobjects/shape/shapes/shape'
import Fold from '../utils/Fold.js';


const Linear = Phaser.Math.Linear;

class Puff extends BaseSpinner {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerPuff';
    }

    buildShapes() {
        var dotCnt = 3;
        for (var i = 0; i < dotCnt; i++) {
            var dot = new Circle();
            this.addShape(dot);

            var valueOffset = Fold(i / (dotCnt - 1)) / 2;
            dot.setData('valueOffset', valueOffset);
        }
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var leftBound = centerX - radius;

        var shapes = this.getShapes(),
            cnt = shapes.length;
        var cellWidth = (radius * 2) / cnt;
        var maxDotRadius = cellWidth / 2;

        for (var i = 0; i < cnt; i++) {
            var dot = shapes[i];
            var t = (this.value + dot.getData('valueOffset')) % 1;
            t = Fold(t);

            var dotAlpha = Linear(0.25, 1, t);
            var dotRadius = Linear(0.5, 1, t) * maxDotRadius;
            dot
                .fillStyle(this.color, dotAlpha)
                .setRadius(dotRadius)
                .setCenterPosition(
                    leftBound + (cellWidth * (i + 0.5)),
                    centerY
                )
        }
    }
}

export default Puff;