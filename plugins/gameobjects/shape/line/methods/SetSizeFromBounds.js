var SetSizeFromBounds = function () {
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
    var shapes = this.getShapes();
    for (var i = 0, cnt = shapes.length; i < cnt; i++) {
        var shape = shapes[i];
        if (shape.visible) {
            shape.offset(-x, -y);
        }
    }
}

export default SetSizeFromBounds;