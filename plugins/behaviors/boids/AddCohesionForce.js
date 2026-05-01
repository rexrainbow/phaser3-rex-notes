import { Math as PhaserMath } from 'phaser';
const Vector2 = PhaserMath.Vector2;
const Distance = PhaserMath.Distance.Between;

var AddCohesionForce = function (myAgent, neighbors, weight, distanceThreshold, out) {
    // Steer towards average position of neighbors (long range attraction)
    if (out === undefined) {
        out = new Vector2();
    }
    if (weight <= 0) {
        return out;
    }
    if ((neighbors.length == 0) ||
        ((neighbors.length === 1) && (neighbors[0] === myAgent))) {
        return out;
    }

    centerPosition.reset();
    var agent, validNeighborsCount = 0;
    for (var i = 0, cnt = neighbors.length; i < cnt; i++) {
        agent = neighbors[i];
        if (agent === myAgent) {
            continue;
        }
        if (Distance(agent.x, agent.y, myAgent.x, myAgent.y) > distanceThreshold) {
            continue;
        }

        centerPosition.add(agent);
        validNeighborsCount++;
    }
    if (validNeighborsCount === 0) {
        return out;
    }
    centerPosition.scale(1 / validNeighborsCount);

    var dx = centerPosition.x - myAgent.x;
    var dy = centerPosition.y - myAgent.y;
    var d = PhaserMath.sqrt((dx * dx) + (dy * dy));

    var p = weight;
    if (distanceThreshold !== Infinity) {
        p *= (d / distanceThreshold);
    }

    var angle = PhaserMath.atan2(dy, dx);
    out.x += (PhaserMath.cos(angle) * p);
    out.y += (PhaserMath.sin(angle) * p);

    return out;
}

var centerPosition = new Vector2();

export default AddCohesionForce;