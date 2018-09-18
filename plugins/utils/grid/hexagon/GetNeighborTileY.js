import NeighborToDeltaTileXY from './NeighborToDeltaTileXY.js';
import GetParity from './GetParity.js';

var GetNeighborTileY = function (tileX, tileY, dir) {
    var parity = GetParity(this.mode, tileX, tileY);
    return tileY + NeighborToDeltaTileXY[this.mode][parity][dir][1];
};

export default GetNeighborTileY;