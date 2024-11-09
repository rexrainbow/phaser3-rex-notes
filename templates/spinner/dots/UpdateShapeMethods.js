import Circle from '../../../plugins/gameobjects/shape/shapes/geoms/lines/arc/Circle.js';
import Yoyo from '../utils/Yoyo.js';

const Linear = Phaser.Math.Linear;

export default {
    buildShapes() {
        var cnt = 3;
        for (var i = 0; i < cnt; i++) {
            var dot = new Circle();
            this.addShape(dot);

            var offset = Yoyo(i / (cnt - 1)) / 2;
            dot.setData('offset', offset);
        }
    },

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
            var t = (this.value + dot.getData('offset')) % 1;
            t = Yoyo(t);

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