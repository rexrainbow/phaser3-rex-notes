import GetBobCenterPosition from './utils/transform/GetBobCenterPosition';

const GetDistance = Phaser.Math.Distance.BetweenPointsSquared;

var GetNearestChild = function (canvasX, canvasY) {
    var pointA = { x: canvasX, y: canvasY };

    var distances = [];

    this.forEachChild(function (child) {
        distances.push({
            child: child,
            distance: GetDistance(pointA, GetBobCenterPosition(child, true))
        })
    })

    distances.sort(function (dataA, dataB) {
        return dataA.distance - dataB.distance;
    })

    return distances[0].child;
}

export default GetNearestChild;