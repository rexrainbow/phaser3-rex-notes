import {
    OrthogonalMap,
    IsometricMap,
    StaggeredMap
} from './NeighborToDeltaTileXY.js';

var GetNeighborTileY = function (tileX, tileY, dir) {
    switch (this.mode) {
        case 0: // orthogonal
            tileY += OrthogonalMap[dir][1];
            break;
        case 1: // isometric
            tileY += IsometricMap[dir][1];
            break;
        case 2: // staggered
            tileY += StaggeredMap[tileY & 1][dir][1];
            break;
    }
    return tileY;
};

export default GetNeighborTileY;