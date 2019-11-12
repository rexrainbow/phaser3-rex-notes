import DirectionToDeltaTileXY from './DirectionToDeltaTileXY.js';
import GetParity from './GetParity.js';

var GetNeighborTileXY = function (tileX, tileY, direction, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    var parity = GetParity(this.mode, tileX, tileY);
    out.x = tileX + DirectionToDeltaTileXY[this.mode][parity][dir][0];
    out.y = tileY + DirectionToDeltaTileXY[this.mode][parity][dir][1];
    return out;
};

var globTileXY = {};

export default GetNeighborTileXY;