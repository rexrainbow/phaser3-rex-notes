import {
    OrthogonalMap,
    IsometricMap
} from './DistanceToDeltaTileXY';

var GetTileXAtDirection = function(tileX?: any, tileY?: any, direction?: any, distance?: any, out?: any) {
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

    out.x = tileX + (distance * deltaTileX);
    out.y = tileY + (distance * deltaTileY);

    return out;
}

var globTileXY = {};

export default GetTileXAtDirection;