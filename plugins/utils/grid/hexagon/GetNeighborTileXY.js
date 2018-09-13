import NeighborToDeltaTileXY from './NeighborToDeltaTileXY.js';
import CONST from './const.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var GetNeighborTileXY = function (tileX, tileY, dir, out) {
    if (out === undefined) {
        out = tmp;
    }
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
    var deltaTileXY = NeighborToDeltaTileXY[this.mode][parity][dir];
    out.x = tileX + deltaTileXY.x;
    out.y = tileY + deltaTileXY.y;
    return out;
};

var tmp = {
    x: 0,
    y: 0
};
export default GetNeighborTileXY;