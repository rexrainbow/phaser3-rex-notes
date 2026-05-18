var HitTest = function(hitAreaName?: any, x?: any, y?: any) {
    var bounds = this.getDrawableBounds(hitAreaName, true);
    if (!bounds) {
        return false;
    }
    if (typeof (x) === 'object') {
        var xy = x;
        x = xy.x;
        y = xy.y;
    }

    return bounds.contains(x, y);
}

export default HitTest;