var FillStyle = function (color, alpha) {
    if (color === undefined) {
        this.isFilled = false;
    } else {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.isFilled = true;
        this.fillColor = color;
        this.fillAlpha = alpha;
    }
    return this;
}

var LineStyle = function (lineWidth, color, alpha) {
    if (lineWidth === undefined) {
        this.isStroked = false;
    } else {
        if (alpha === undefined) {
            alpha = 1;
        }
        this.isStroked = true;
        this.lineWidth = lineWidth;
        this.strokeColor = color;
        this.strokeAlpha = alpha;
    }
    return this;
}

export default {
    fillStyle: FillStyle,
    lineStyle: LineStyle
}