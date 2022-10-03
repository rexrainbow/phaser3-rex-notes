var UpdateShapes = function () {
    var trackX0 = 0, trackX1 = this.width,
        trackY0 = 0, trackY1 = this.height;

    var trackFill = this.getShape('trackFill');
    trackFill.fillStyle(this.trackColor);
    if (trackFill.isFilled) {
        trackFill
            .startAt(trackX0, trackY0).lineTo(trackX1, trackY0)
            .lineTo(trackX1, trackY1)
            .lineTo(trackX0, trackY1)
            .lineTo(trackX0, trackY0).close()
    }

    var bar = this.getShape('bar');
    bar.fillStyle(this.barColor);
    if (bar.isFilled) {
        var barX0, barX;
        if (!this.rtl) {
            barX = this.width * this.value;
            barX0 = 0;
        } else {
            barX = this.width * (1 - this.value);
            barX0 = this.width;
        }
        bar
            .startAt(barX0, trackY0).lineTo(barX, trackY0)
            .lineTo(barX, trackY1)
            .lineTo(barX0, trackY1)
            .lineTo(barX0, trackY0).close()
    }

    var trackStroke = this.getShape('trackStroke');
    trackStroke.lineStyle(this.trackStrokeThickness, this.trackStrokeColor);
    if (trackStroke.isStroked) {
        trackStroke
            .startAt(trackX0, trackY0).lineTo(trackX1, trackY0)
            .lineTo(trackX1, trackY1)
            .lineTo(trackX0, trackY1)
            .lineTo(trackX0, trackY0).end()
    }
}

export default UpdateShapes;