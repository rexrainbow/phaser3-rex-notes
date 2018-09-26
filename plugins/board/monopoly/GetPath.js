import TileData from './TileData.js';
import CONST from './const.js';

const STOP = CONST.STOP;

var GetPath = function (movingPoints, out) {
    if (out === undefined) {
        out = [];
    }
    if (this.board === null) { // chess is not in board
        return out;
    }
    var curTileXYZ = this.chessData.tileXYZ,
        curTileData = new TileData(curTileXYZ.x, curTileXYZ.y, this.face),
        nextTileData;
    var cost;
    while (movingPoints > 0) {
        nextTileData = this.getNextTile(curTileData, this.preTileXY);
        if (nextTileData === null) {
            break;
        }
        cost = this.getCost(nextTileData);
        if (cost === STOP) {
            cost = movingPoints;
        }
        if (movingPoints >= cost) {
            out.push(nextTileData);
        }
        movingPoints -= cost;

        this.preTileXY = curTileData;
        curTileData = nextTileData;
    }
    return out;
}

export default GetPath;