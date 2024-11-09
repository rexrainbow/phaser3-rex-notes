import Line from '../../../plugins/gameobjects/shape/shapes/geoms/lines/Line.js';
import Yoyo from '../utils/Yoyo.js';

const Linear = Phaser.Math.Linear;
const ExpoIn = Phaser.Math.Easing.Expo.In;
const RowNum = 2;
const ColNum = 2;

export default {
    buildShapes() {
        var cnt = RowNum * ColNum;
        for (var i = 0; i < cnt; i++) {
            var line = new Line();
            this.addShape(line);
        }
    },

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var leftBound = centerX - radius;
        var topBound = centerY - radius;
        var cellWidth = (radius * 2) / ColNum;
        var cellHeight = (radius * 2) / RowNum;

        var shapes = this.getShapes(),
            cnt = shapes.length;
        for (var i = 0; i < cnt; i++) {
            var colIdx = (i % ColNum);
            var rowIdx = Math.floor(i / RowNum);
            var x = leftBound + (cellWidth * (colIdx + 0.5));
            var y = topBound + (cellHeight * (rowIdx + 0.5));

            var line = shapes[i];
            var t = (this.value + ((cnt - i) * 0.1)) % 1;
            t = ExpoIn(Yoyo(t));

            var lineAlpha = (cnt - i) / cnt;
            var lineHeight = Linear(0.7, 1, t) * cellHeight;
            var lineWidth = Linear(0.7, 1, t) * cellWidth;

            line
                .lineStyle(lineWidth, this.color, lineAlpha)
                .setP0(x - (lineHeight / 2), y)
                .setP1(x + (lineHeight / 2), y);
        }
    }
}