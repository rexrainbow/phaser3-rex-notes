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

        var nextChild = children[i + 1];
        if (!nextChild || (nextChild.y === child.y)) {
            continue;
        }

        // nextChild is at next line
        distance = DistanceBetween(child.right, child.centerY, x, y);
        if (minDistance > distance) {
            minDistance = distance;
            nearestIndex = i + 1;
        }
    }

    return nearestIndex;
}

export default GetNearestChildIndex;