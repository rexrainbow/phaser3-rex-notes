import {
    OrthogonalMap,
    IsometricMap,
    StaggeredMap
} from './NeighborToDeltaTileXY.js';

var GetNeighborTileX = function (tileX, tileY, dir) {
    switch (this.mode) {
        case 0: // orthogonal
            tileX += OrthogonalMap[dir][0];
            break;
        case 1: // isometric
            tileX += IsometricMap[dir][0];
            break;
        case 2: // staggered
            tileX += StaggeredMap[tileY & 1][dir][0];
            break;
    }
    return tileX;
};

export default GetNeighborTileX;