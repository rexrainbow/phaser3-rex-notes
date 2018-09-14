import NeighborToDeltaTileXY from './NeighborToDeltaTileXY.js';
import CONST from './const.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var GetNeighborTileX = function (tileX, tileY, dir, out) {
    var parity;
    switch (this.mode) {
        case ODD_R:
        case EVEN_R:
            parity = tileY & 1;
            break;

        case ODD_Q:
        case EVEN_Q:
            parity = tileX & 1;
            break;
    }
    return tileX + NeighborToDeltaTileXY[this.mode][parity][dir][0];
};
export default GetNeighborTileX;