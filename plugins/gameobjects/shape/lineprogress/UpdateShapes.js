var UpdateShapes = function () {
    var skewX = this.skewX;
    var width = this.width - Math.abs(skewX);
    var height = this.height;

    var trackFill = this.getShape('trackFill');
    trackFill.fillStyle(this.trackColor);
    if (trackFill.isFilled) {
        BuildRectangle(
            trackFill,      // lines
            0, 0,           // x0, y0
            width, height,  // x1, y1
            skewX           // skewX
        )
    }

    var bar = this.getShape('bar');
    bar.fillStyle(this.barColor);
    if (bar.isFilled) {
        var barX0, barX1;
        if (!this.rtl) {
            barX0 = 0;
            barX1 = width * this.value;
        } else {
            barX0 = width * (1 - this.value);
            barX1 = width;
        }

        BuildRectangle(
            bar,            // lines
            barX0, 0,       // x0, y0
            barX1, height,  // x1, y1
            skewX           // skew
        )
    }

    var trackStroke = this.getShape('trackStroke');
    trackStroke.lineStyle(this.trackStrokeThickness, this.trackStrokeColor);
    if (trackStroke.isStroked) {
        BuildRectangle(
            trackStroke,     // lines            
            0, 0,           // x0, y0
            width, height,  // x1, y1
            skewX           // skewX
        )
    }
}

var BuildRectangle = function (lines, x0, y0, x1, y1, skewX) {
    var startX = (x0 + x1) / 2;  // Start x from middle
    if (skewX >= 0) {
        lines
            .startAt(startX + skewX, y0).lineTo(x1 + skewX, y0)
            .lineTo(x1, y1)
            .lineTo(x0, y1)
            .lineTo(x0 + skewX, y0).lineTo(startX + skewX, y0)
    } else {
        lines
            .startAt(startX, y0).lineTo(x1, y0)
            .lineTo(x1 - skewX, y1)
            .lineTo(x0 - skewX, y1)
            .lineTo(x0, y0).lineTo(startX, y0)
    }

    lines.close();

    return lines;
}

export default UpdateShapes;