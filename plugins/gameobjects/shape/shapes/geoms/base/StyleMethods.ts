var FillStyle = function(color?: any, alpha?: any) {
    if (color == null) {
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

var LineStyle = function(lineWidth?: any, color?: any, alpha?: any) {
    if ((lineWidth == null) || (color == null)) {
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