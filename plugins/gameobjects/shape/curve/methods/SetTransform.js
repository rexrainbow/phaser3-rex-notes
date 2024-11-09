import GetBounds from './GetBounds.js';

var SetTransform = function (line) {
    // Size
    var bounds = GetBounds.call(this, line.pathData, true);
    this.setSize(bounds.width, bounds.height);
    // Origin
    this.setOrigin(-bounds.x / bounds.width, -bounds.y / bounds.height);
    // Position
    var point = this.points[0];
    this.setPosition(point.x, point.y);
    line.offset(-bounds.x, -bounds.y);
}

export default SetTransform;