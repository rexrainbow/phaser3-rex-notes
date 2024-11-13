import GetBounds from './GetBounds.js';

var SetTransform = function (line) {
    // Size
    var bounds = GetBounds.call(this, line.pathData, true);
    var width = Math.max(bounds.width, this.lineWidth);
    var height = Math.max(bounds.height, this.lineWidth);
    this.setSize(width, height);
    // Origin
    this.setOrigin(-bounds.x / width, -bounds.y / height);
    // Position
    var point = this.points[0];
    this.setPosition(point.x, point.y);
    line.offset(-bounds.x, -bounds.y);
}

export default SetTransform;