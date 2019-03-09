import GetAngle from '../../math/angle/Between.js';
import RadToDegree from '../../math/RadToDeg.js';

var DirectionBetween = function (tileA, tileB) {
    var direction;
    switch (this.mode) {
        case 0: // orthogonal
        case 1: // isometric
            if (tileA.y === tileB.y) {
                direction = (tileB.x >= tileA.x) ? 0 : 2;
            } else if (tileA.x === tileB.x) {
                direction = (tileB.y >= tileA.y) ? 1 : 3;
            } else {
                var angle = RadToDegree(GetAngle(tileA.x, tileA.y, tileB.x, tileB.y)); // -180~180
                if (angle < 0) {
                    angle += 360;
                }
                direction = angle / 90;
            }
            break;
        case 2: // staggered
            // TODO
            break;
    }

    return direction;
}

export default DirectionBetween;