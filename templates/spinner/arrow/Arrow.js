import Base from '../base/Base.js';
import { Lines } from '../utils/Geoms.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;

class Arrow extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerArrow';

        this.direction = GetValue(config, 'direction', 'down');
    }

    buildShapes() {
        for (var i = 0; i < 3; i++) {
            this.addShape(new Lines());
        }
    }

    updateShapes() {
        var x0, y0, a, b, c, d;
        switch (this.direction) {
            case 'down':
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

            case 'up':
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

            case 'left':
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

            case 'right':
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

            default:
                break;
        }

        var gridSize = this.radius / 7.5;

        var t = this.value;
        var alphaThreshold = 1 / 3;

        var shapes = this.getShapes();

        // Arrow0
        var arrow0 = shapes[0];
        var alpha = (t > alphaThreshold) ? 1 : t / alphaThreshold;
        arrow0.fillStyle(this.color, alpha);
        ArrowPolygon(arrow0, 1, 3, gridSize, gridSize, x0, y0, a, b, c, d);

        // Arrow1
        t -= alphaThreshold;
        var arrow1 = shapes[1];
        if (t > 0) {
            var alpha = (t > alphaThreshold) ? 1 : t / alphaThreshold;
            arrow1.fillStyle(this.color, alpha);
            ArrowPolygon(arrow1, 4, 6, gridSize, gridSize, x0, y0, a, b, c, d);
        } else {
            arrow1.fillStyle()
        }

        // Arrow2
        t -= alphaThreshold;
        var arrow2 = shapes[2];
        if (t > 0) {
            var alpha = (t > alphaThreshold) ? 1 : t / alphaThreshold;
            arrow2.fillStyle(this.color, alpha);
            ArrowPolygon(arrow2, 7, 9, gridSize, gridSize, x0, y0, a, b, c, d);
        } else {
            arrow2.fillStyle()
        }
    }
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

export default Arrow;