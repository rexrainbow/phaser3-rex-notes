import Random from '../../../utils/math/Between.js';
import GetRandomItem from '../../../utils/array/GetRandom.js';

var GetRandomEmptyTileXY = function (tileZ, out) {
    if (tileZ === undefined) {
        tileZ = 0;
    }
    if (out === undefined) {
        out = tmpTileXY;
    }

    var tileX, tileY;
    var isOccupied = true;
    var tryCount = 20;
    while (isOccupied && (tryCount > 0)) {
        tileX = Random(0, this.width - 1);
        tileY = Random(0, this.height - 1);
        isOccupied = (this.tileXYZToChess(tileX, tileY, tileZ) !== null);
        tryCount--;
    }

    if (!isOccupied) {
        out.x = tileX;
        out.y = tileY;
        return out;
    } else {
        var tmpTileXYArray = this.getEmptyTileXYArray(tileZ, tmpTileXYArray);
        if (tmpTileXYArray.length === 0) {
            return null;
        } else {
            var tileXY = GetRandomItem(tmpTileXYArray);
            out.x = tileXY.x;
            out.y = tileXY.y;
            tmpTileXYArray.length = 0;
            return out;
        }
    }
}

var tmpTileXYArray = [];
var tmpTileXY = {
    x: 0,
    y: 0
}
export default GetRandomEmptyTileXY;