import NeighborToDeltaTileXY from './NeighborToDeltaTileXY.js';
import GetParity from './GetParity.js';

var GetNeighborTileX = function (tileX, tileY, dir) {
    var parity = GetParity(this.mode, tileX, tileY);
    return tileX + NeighborToDeltaTileXY[this.mode][parity][dir][0];
};
export default GetNeighborTileX;