import {
    OrthogonalMap,
    IsometricMap
} from './DistanceToDeltaTileXY.js';
import Offset from './Offset.js';

var GetTileXAtDirection = function (tileX, tileY, direction, distance, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    var deltaTileX, deltaTileY;
    switch (this.mode) {
        case 0: // orthogonal
            deltaTileX = OrthogonalMap[direction][0];
            deltaTileY = OrthogonalMap[direction][1];
            break;
        case 1: // isometric
            deltaTileX = IsometricMap[direction][0];
            deltaTileY = IsometricMap[direction][1];
            break;
    }
    deltaTileX *= distance;
    deltaTileY *= distance;

    out.x = tileX;
    out.y = tileY;
    Offset.call(this, out, deltaTileX, deltaTileY, out);
    return out;
}

var globTileXY = {};

export default GetTileXAtDirection;