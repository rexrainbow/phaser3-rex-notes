import Circle from '../../../plugins/gameobjects/shape/shapes/geoms/lines/arc/Circle.js';
import Yoyo from '../utils/Yoyo.js';

const Linear = Phaser.Math.Linear;
const RowNum = 3;
const ColNum = 3;

export default {
    buildShapes() {
        var cnt = RowNum * ColNum;
        for (var i = 0; i < cnt; i++) {
            var dot = new Circle();
            this.addShape(dot);

            dot.setData('offset', Math.random());
        }
        this.isInitialize = true;
    },

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var needLayout = this.isInitialize || this.isSizeChanged;

        var leftBound = centerX - radius;
        var topBound = centerY - radius;
        var cellWidth = (radius * 2) / ColNum;
        var cellHeight = (radius * 2) / RowNum;
        var maxDotRadius = (Math.min(cellWidth, cellHeight) / 2) * 0.8;


        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var colIdx = (i % ColNum);
            var rowIdx = Math.floor(i / RowNum);
            var x = leftBound + cellWidth * (colIdx + 0.5);
            var y = topBound + cellHeight * (rowIdx + 0.5);

            var dot = shapes[i];
            var t = (this.value + dot.getData('offset')) % 1;
            t = Yoyo(t);
            dot.fillStyle(this.color, Linear(0.25, 1, t));

            if (needLayout) {
                dot
                    .setRadius(maxDotRadius)
                    .setCenterPosition(x, y)
            }
        }

        this.isInitialize = false;
    }
}