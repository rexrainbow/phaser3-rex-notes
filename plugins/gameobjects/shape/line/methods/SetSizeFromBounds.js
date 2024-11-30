var SetSizeFromBounds = function (line, bounds) {
    // Size    
    var bounds = this.bounds;
    var radius = this.pointRadius;
    var x = bounds.x - radius;
    var y = bounds.y - radius;
    var width = bounds.width + (radius * 2);
    var height = bounds.height + (radius * 2);
    this.setSize(width, height);
    // Origin
    this.setOrigin(-x / width, -y / height);
    // Position
    var point = this.points[0];
    this.setPosition(point.x, point.y);
    line.offset(-x, -y);
}

export default SetSizeFromBounds;