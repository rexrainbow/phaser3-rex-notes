import { Math as PhaserMath } from 'phaser';
const Vector2 = PhaserMath.Vector2;
const Distance = PhaserMath.Distance.Between;

var AddAlignmentForce = function (myAgent, neighbors, weight, distanceThreshold, out) {
    // Steer towards average heading of neighbors               
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

    var sum = 0, validNeighborsCount = 0;
    var agent;
    for (var i = 0, cnt = neighbors.length; i < cnt; i++) {
        agent = neighbors[i];
        if (agent === myAgent) {
            continue;
        }
        if (Distance(agent.x, agent.y, myAgent.x, myAgent.y) > distanceThreshold) {
            continue;
        }

        sum += agent.rotation;
        validNeighborsCount++;
    }

    if (validNeighborsCount === 0) {
        return out;
    }
    var angle = sum / validNeighborsCount;
    var p = weight;
    out.x += (PhaserMath.cos(angle) * p);
    out.y += (PhaserMath.sin(angle) * p);

    return out;
}

export default AddAlignmentForce;