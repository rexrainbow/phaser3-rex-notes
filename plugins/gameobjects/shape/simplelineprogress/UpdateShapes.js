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
        var x0, x;
        if (!this.rtl) {
            x = this.width * this.value;
            x0 = 0;
        } else {
            x = this.width * (1 - this.value);
            x0 = this.width;
        }
        bar
            .startAt(x0, trackY0).lineTo(x, trackY0)
            .lineTo(x, trackY1)
            .lineTo(x0, trackY1)
            .lineTo(x0, trackY0).close()
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