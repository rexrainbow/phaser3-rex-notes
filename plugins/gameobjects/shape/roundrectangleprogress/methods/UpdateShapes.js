import BuildRoundRectangle from './BuildRoundRectangle.js';
import BuildRoundRectangleBar from './BuildRoundRectangleBar.js';

var UpdateShapes = function () {
    var width = this.width;
    var height = this.height;
    var cornerRadius = this.rrGeom.cornerRadius;
    var value = this.value;
    var orientation = this.orientation;
    var rtl = this.rtl;
    var iteration = this.iteration + 1;

    var trackFill = this.getShape('trackFill');
    trackFill.fillStyle(this.trackColor);
    if (trackFill.isFilled) {
        BuildRoundRectangle(
            trackFill,
            width, height, cornerRadius,
            iteration
        )
    }

    var bar = this.getShape('bar');
    bar.fillStyle(this.barColor);
    if (bar.isFilled) {
        BuildRoundRectangleBar(
            bar,
            width, height, cornerRadius,
            value, orientation, rtl,
            iteration
        )
    }

    var trackStroke = this.getShape('trackStroke');
    trackStroke.lineStyle(this.trackStrokeThickness, this.trackStrokeColor);
    if (trackStroke.isStroked) {
        BuildRoundRectangle(
            trackStroke,     // lines  
            width, height, cornerRadius,
            iteration
        )
    }
}

export default UpdateShapes;