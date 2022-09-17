import BobPositionToCanvasPosition from './transform/BobPositionToCanvasPosition.js';

const DistanceSquare = Phaser.Math.Distance.BetweenPointsSquared;

var GetNearestChild = function (canvasX, canvasY) {
    if (globPoint === undefined) {
        globPoint = {};
    }
    globPoint.x = canvasX;
    globPoint.y = canvasY;

    var children = this.children;
    var distances = [];
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (!child.active || !child.renderable) {
            continue;
        }
        var childPoint = BobPositionToCanvasPosition(child.drawCenterX, child.drawCenterY, child, true);
        var distanceSquare = DistanceSquare(childPoint, globPoint);
        distances.push({
            child: child,
            distance: distanceSquare
        })
    }

    if (distances.length === 0) {
        return null;
    } else {
        distances.sort(function (a, b) {
            return a.distance - b.distance;
        });
        return distances[0].child;
    }

}

var globPoint = {};

export default GetNearestChild;