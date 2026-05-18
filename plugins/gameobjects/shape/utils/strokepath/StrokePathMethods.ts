import BuildDashStroke from './BuildDashStroke';

var SetDashPattern = function(dashPattern?: any, dashOffset?: any) {
    // dashPattern: [draw, gap] , or {segments, drawRatio}
    this.dashPattern = dashPattern;
    this.dashOffset = dashOffset || 0;
    this.isDashed = !!dashPattern;
    return this;
}

var ClearDashPattern = function() {
    this.setDashPattern();
    return this;
}

var SetDashed = function(enable?: any) {
    if (enable === undefined) {
        enable = true;
    }

    this.isDashed = enable;
    return this;
}

var BuildStrokePath = function() {
    if (this.isDashed) {
        var result = BuildDashStroke(this.pathData, {
            closePath: this.closePath,
            dashPattern: this.dashPattern,
            dashOffset: this.dashOffset
        }, this);

        if (result?: any) {
            this.strokePathData = result.strokePathData;
            this.strokePathMask = result.strokePathMask;
        } else {
            this.isDashed = false;
        }

    }

    return this;
}

var StrokePathConfigMethods = {
    setDashPattern: SetDashPattern,
    clearDashPattern: ClearDashPattern,
    setDashed: SetDashed
}

export {
    StrokePathConfigMethods,
}

var Methods = {
    buildStrokePath: BuildStrokePath
};
Object.assign(
    Methods,
    StrokePathConfigMethods,
)

export default Methods;