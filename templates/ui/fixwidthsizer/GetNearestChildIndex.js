const DistanceBetween = Phaser.Math.Distance.Between;

var GetNearestChildIndex = function (x, y) {
    var children = this.sizerChildren;
    var nearestIndex = -1,
        minDistance = Infinity;
    var child, distance;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        // position is not at this line
        if (Math.abs(child.centerY - y) > (child.height / 2)) {
            continue;
        }

        distance = DistanceBetween(child.left, child.centerY, x, y);
        if (minDistance > distance) {
            minDistance = distance;
            nearestIndex = i;
        }
    }

    return nearestIndex;
}

export default GetNearestChildIndex;