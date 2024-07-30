import DrawCicle from '../../../utils/canvas/DrawCircle.js';
import DrawText from '../../../utils/canvas/DrawText.js';

const PI2 = Phaser.Math.PI2;

var DrawContent = function () {
    var x = this.radius;
    var lineWidth = this.thickness * this.radius;
    var barRadius = this.radius - (lineWidth / 2);
    var centerRadius = this.radius - lineWidth;
    var canvas = this.canvas,
        context = this.context;

    var anticlockwise = this.anticlockwise,
        startAngle = this.startAngle,
        endAngle = this.endAngle,
        deltaAngle = this._deltaAngle;

    // Draw track
    if (this.trackColor && (lineWidth > 0)) {
        context.save();

        DrawCicle(
            canvas, context,
            x, x,
            barRadius, barRadius,
            undefined,
            this.trackColor,
            lineWidth,
            startAngle, endAngle, anticlockwise
        );

        context.restore();
    }

    // Draw bar
    if ((this.barColor) && (barRadius > 0)) {
        var barEndAngle;

        if (this.value >= 1) {
            barEndAngle = endAngle;
        } else {
            if (anticlockwise) {
                barEndAngle = (startAngle - (deltaAngle * this.value) + PI2) % PI2;
            } else {
                barEndAngle = (startAngle + deltaAngle * this.value) % PI2;
            }
        }

        context.save();

        var style;
        if (this.barColor2) {
            var x0 = x + (barRadius * Math.cos(startAngle)),
                y0 = x + (barRadius * Math.sin(startAngle)),
                x1 = x + (barRadius * Math.cos(barEndAngle)),
                y1 = x + (barRadius * Math.sin(barEndAngle));
            var grd = context.createLinearGradient(x0, y0, x1, y1);
            grd.addColorStop(0, this.barColor2);
            grd.addColorStop(1, this.barColor);
            style = grd;
        } else {
            style = this.barColor;
        }

        DrawCicle(
            canvas, context,
            x, x,
            barRadius, barRadius,
            undefined,
            style,
            lineWidth,
            startAngle, barEndAngle, anticlockwise
        );

        context.restore();
    }

    // Draw center
    if (this.centerColor && (centerRadius > 0)) {
        var fillStyle;
        if (this.centerColor2) {
            fillStyle = this.context.createRadialGradient(x, x, 0, x, x, centerRadius);
            fillStyle.addColorStop(0, this.centerColor);
            fillStyle.addColorStop(1, this.centerColor2);
        } else {
            fillStyle = this.centerColor;
        }

        context.save();

        DrawCicle(
            canvas, context,
            x, x,
            centerRadius, centerRadius,
            fillStyle
        );

        context.restore();
    }

    // Draw text
    if (this.textFormatCallback && (this.textColor || this.textStrokeColor)) {

        context.save();

        DrawText(
            canvas, context,
            x, x,
            this.getFormatText(), this.textFont,
            this.textColor, this.textStrokeColor, this.textStrokeThickness,
            'center',  // textAlign
            'middle'   // textBaseline
        )

        context.restore();
    }
}

export default DrawContent;