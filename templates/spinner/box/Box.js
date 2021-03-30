import BaseSpinner from '../base/BaseSpinner.js';
import { Lines } from '../utils/Geoms.js';

const Linear = Phaser.Math.Linear;

class Box extends BaseSpinner {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerCube';
    }

    buildShapes() {
        this.addShape((new Lines()).setName('border'));
        this.addShape((new Lines()).setName('fill'));
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;

        var halfWidth = radius * 0.7;
        var left = centerX - halfWidth,
            right = centerX + halfWidth,
            top = centerY - halfWidth,
            bottom = centerY + halfWidth;

        this.getShape('border')
            .lineStyle(2, this.color, 1)
            .startAt(left, top).lineTo(right, top)
            .lineTo(right, bottom).lineTo(left, bottom)
            .lineTo(left, top).close();

        if (this.value < 0.5) {
            var t = (0.5 - this.value) * 2;
            var fillBottom = top + t * halfWidth * 2;
            this.getShape('fill')
                .fillStyle(this.color, 1)
                .startAt(left, top).lineTo(right, top)
                .lineTo(right, fillBottom).lineTo(left, fillBottom)
                .lineTo(left, top).close();

        } else { // Rotate
            var t = (this.value - 0.5) * 2;
            var angle = 180 * t;

            this.getShape('border').rotateAround(centerX, centerY, angle);
            this.getShape('fill').fillStyle().lineStyle();
        }
    }
}

export default Box;