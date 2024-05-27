import Base from '../base/Base.js';
import { Lines } from '../utils/Geoms.js'
import Yoyo from '../utils/Yoyo.js';


class Hearts extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerHearts';
    }

    buildShapes() {
        for (var i = 0; i < 2; i++) {
            this.addShape(new Lines());
        }
    }

    updateShapes() {
        var centerX = this.centerX;
        var centerY = this.centerY;
        var radius = this.radius;
        var lineWidth = Math.ceil(radius / 25);
        var maxW50 = radius - lineWidth,
            maxW30 = maxW50 * 0.6,
            maxW35 = maxW50 * 0.7,
            maxW60 = maxW50 * 1.2;


        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var heart = shapes[i];
            var t = (this.value + (i / cnt)) % 1;
            var alpha = Yoyo(t);
            var x = centerX,
                y = centerY - (15 * t);
            var w50 = maxW50 * t,
                w30 = maxW30 * t,
                w35 = maxW35 * t,
                w60 = maxW60 * t;

            heart
                .lineStyle(lineWidth, this.color, alpha)
                .startAt(
                    x, y
                )
                .cubicBezierCurveTo(
                    x, y - w30,
                    x - w50, y - w30,
                    x - w50, y
                )
                .cubicBezierCurveTo(
                    x - w50, y + w30,
                    x, y + w35,
                    x, y + w60
                )
                .cubicBezierCurveTo(
                    x, y + w35,
                    x + w50, y + w30,
                    x + w50, y
                )
                .cubicBezierCurveTo(
                    x + w50, y - w30,
                    x, y - w30,
                    x, y
                )
                .close()
        }
    }
}

export default Hearts;