const DistanceBetween = Phaser.Math.Distance.Between;

var GetNearestChildIndex = function (x, y) {
    var children = this.sizerChildren;
    var nearestIndex = -1,
        minDistance = Infinity;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        // position is not at this line
        if (Math.abs(child.centerY - y) > (child.height / 2)) {
            continue;
        }

        var distance = DistanceBetween(child.left, child.centerY, x, y);
        if (minDistance > distance) {
            minDistance = distance;
            nearestIndex = i;
        }

        // Is last child
        if (i === cnt - 1) {
            var distance = DistanceBetween(child.right, child.centerY, x, y);
            if (minDistance > distance) {
                minDistance = distance;
                nearestIndex = i + 1;
            }
        }

        // nextChild is at next line
        var nextChild = children[i + 1];
        if (!nextChild || (nextChild.y === child.y)) {
            continue;
        }

        var distance = DistanceBetween(child.right, child.centerY, x, y);
        if (minDistance > distance) {
            minDistance = distance;
            nearestIndex = i + 1;
        }
    }

    return nearestIndex;
}

export default GetNearestChildIndex;