import Lines from '../../../plugins/gameobjects/shape/shapes/geoms/lines/Lines.js';
import Yoyo from '../utils/Yoyo.js';

const DegToRad = Phaser.Math.DegToRad;
const Linear = Phaser.Math.Linear;
const ExpoIn = Phaser.Math.Easing.Expo.In;

const DIRMAP = {
    right: 0,
    down: 1,
    left: 2,
    up: 3
}

var ArrowPolygon = function (polygon, innerX, outerX, gridWidth, gridHeight, x0, y0, a, b, c, d) {
    var p0 = Transform(innerX, 0, gridWidth, gridHeight, x0, y0, a, b, c, d);
    polygon.startAt(p0.x, p0.y);
    var p1 = Transform(outerX, 0, gridWidth, gridHeight, x0, y0, a, b, c, d);
    polygon.lineTo(p1.x, p1.y);
    var p2 = Transform(outerX, outerX, gridWidth, gridHeight, x0, y0, a, b, c, d);
    polygon.lineTo(p2.x, p2.y);
    var p3 = Transform(0, outerX, gridWidth, gridHeight, x0, y0, a, b, c, d);
    polygon.lineTo(p3.x, p3.y);
    var p4 = Transform(0, innerX, gridWidth, gridHeight, x0, y0, a, b, c, d);
    polygon.lineTo(p4.x, p4.y);
    var p5 = Transform(innerX, innerX, gridWidth, gridHeight, x0, y0, a, b, c, d);
    polygon.lineTo(p5.x, p5.y);
    polygon.close();
}

var GlobPoint = {};
var Transform = function (gridX, gridY, gridWidth, gridHeight, x0, y0, a, b, c, d) {
    var x = gridX * gridWidth;
    var y = gridY * gridHeight;
    GlobPoint.x = a * x + b * y + x0;
    GlobPoint.y = c * x + d * y + y0;
    return GlobPoint;
}

export default {
    setDirection(direction) {
        if (typeof (direction) === 'string') {
            direction = DIRMAP[direction];
        }
        this.direction = direction;
        return this;
    },

    buildShapes() {
        for (var i = 0; i < 3; i++) {
            this.addShape(new Lines());
        }
    },

    updateShapes() {
        var x0, y0, a, b, c, d;
        switch (this.direction) {
            case 1:
                x0 = this.centerX;
                y0 = this.centerY - this.radius;
                // xt = a*x + b*y
                var radX = DegToRad(315)
                a = Math.cos(radX);
                b = Math.sin(radX);
                // yt = c*x + d*y
                var radY = DegToRad(45)
                c = Math.cos(radY);
                d = Math.sin(radY);
                break;

            case 3:
                x0 = this.centerX;
                y0 = this.centerY + this.radius;
                // xt = a*x + b*y
                var radX = DegToRad(135)
                a = Math.cos(radX);
                b = Math.sin(radX);
                // yt = c*x + d*y
                var radY = DegToRad(225)
                c = Math.cos(radY);
                d = Math.sin(radY);
                break;

            case 2:
                x0 = this.centerX + this.radius;
                y0 = this.centerY;
                // xt = a*x + b*y
                var radX = DegToRad(225)
                a = Math.cos(radX);
                b = Math.sin(radX);
                // yt = c*x + d*y
                var radY = DegToRad(315)
                c = Math.cos(radY);
                d = Math.sin(radY);
                break;

            default:
                x0 = this.centerX - this.radius;
                y0 = this.centerY;
                // xt = a*x + b*y
                var radX = DegToRad(45)
                a = Math.cos(radX);
                b = Math.sin(radX);
                // yt = c*x + d*y
                var radY = DegToRad(135)
                c = Math.cos(radY);
                d = Math.sin(radY);
                break;
        }

        var gridSize = this.radius / 7;

        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var shape = shapes[i];

            var t = (this.value + ((cnt - i) * 0.1)) % 1;
            t = ExpoIn(Yoyo(t));
            var alpha = Linear(0.25, 1, t);

            shape.fillStyle(this.color, alpha);

            var innerX = (i * 3) + 1;
            var outerX = innerX + 2;
            ArrowPolygon(shape, innerX, outerX, gridSize, gridSize, x0, y0, a, b, c, d);
        }
    }
}

