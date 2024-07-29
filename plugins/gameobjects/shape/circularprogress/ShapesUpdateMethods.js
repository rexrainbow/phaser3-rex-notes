import { Lines, Circle } from '../shapes/geoms';

const RadToDeg = Phaser.Math.RadToDeg;
const DegToRad = Phaser.Math.DegToRad;

var FillArc = function (shape, x, y, outerRadius, innerRadius, startAngle, endAngle, anticlockwise) {
    var isCircle = Math.abs(endAngle - startAngle) === 360;
    var radStartAngle = DegToRad(startAngle),
        radEndAngle = DegToRad(endAngle);
    var cosStartAngle = Math.cos(radStartAngle),
        sinStartAngle = Math.sin(radStartAngle),
        cosEndAngle = Math.cos(radEndAngle),
        sinEndAngle = Math.sin(radEndAngle);

    shape.startAt(x + (cosStartAngle * outerRadius), y + (sinStartAngle * outerRadius))
    shape.arc(x, y, outerRadius, startAngle, endAngle, anticlockwise);

    if (isCircle && (innerRadius === 0)) {
        // Pure circle
    } else {
        shape.lineTo(x + (cosEndAngle * innerRadius), y + (sinEndAngle * innerRadius));

        if (innerRadius > 0) {
            shape.arc(x, y, innerRadius, endAngle, startAngle, !anticlockwise);
        }
    }

    shape.close();
    return shape;
}

export default {
    buildShapes() {
        var iterations = this.iterations;

        this
            .addShape((new Lines()).setIterations(iterations).setName('track'))
            .addShape((new Lines()).setIterations(iterations).setName('bar'))
            .addShape((new Circle()).setIterations(iterations).setName('center'))
    },

    updateShapes() {
        var x = this.radius;
        var barWidth = this.thickness * this.radius;
        var barOuterRadius = this.radius;
        var barInnerRadius = barOuterRadius - barWidth;

        // Track shape
        var trackShape = this.getShape('track');
        if ((this.trackColor != null) && (this.thickness > 0)) {
            trackShape.fillStyle(this.trackColor);
            FillArc(trackShape, x, x, barOuterRadius, barInnerRadius, 0, 360, false);
        } else {
            trackShape.reset();
        }

        // Bar shape
        var barShape = this.getShape('bar');
        if ((this.barColor != null) && (this.thickness > 0)) {
            var anticlockwise, startAngle, endAngle;
            if (this.value === 1) {
                anticlockwise = false;
                startAngle = 0;
                endAngle = 360;
            } else {
                anticlockwise = this.anticlockwise;
                startAngle = RadToDeg(this.startAngle);
                var deltaAngle = 360 * ((anticlockwise) ? (1 - this.value) : this.value);
                endAngle = deltaAngle + startAngle;
            }

            barShape.fillStyle(this.barColor);
            FillArc(barShape, x, x, barOuterRadius + 1, barInnerRadius - 1, startAngle, endAngle, false);

        } else {
            barShape.reset();
        }

        // Center shape
        var centerShape = this.getShape('center');
        if (this.centerColor && (barInnerRadius > 0)) {
            centerShape
                .setCenterPosition(x, x)
                .setRadius(barInnerRadius)
                .fillStyle(this.centerColor);
        } else {
            centerShape.reset();
        }
    }
}