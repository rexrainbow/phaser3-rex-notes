import GetMinMaxTileXY from '../utils/GetMinMaxTileXY.js';
import OffsetTransfer from './transferfunctions/Offset.js';
import ResetChessTileXYZ from './ResetChessTileXYZ.js';

var SetOrigin = function (origin) {
    if (origin === undefined) {
        origin = 'center';
    }
    var minMaxTileXY = GetMinMaxTileXY.call(this, undefined, true);
    var offsetX, offsetY;
    if (origin === 'center') {
        offsetX = -Math.floor((minMaxTileXY.maxX - minMaxTileXY.minX) / 2);
        offsetY = -Math.floor((minMaxTileXY.maxY - minMaxTileXY.minY) / 2);
    } else { // top-left
        offsetX = -minMaxTileXY.minX;
        offsetY = -minMaxTileXY.minY;
    }
    if ((offsetX !== 0) || (offsetY !== 0)) {
        var newTileXYZMap = OffsetTransfer.call(this, offsetX, offsetY);
        ResetChessTileXYZ.call(this, newTileXYZMap);
        var worldOffsetXY = this.board.tileXYToWorldXY(offsetX, offsetY);
        var world0 = this.board.tileXYToWorldXY(0, 0);
        this.setPosition(
            (this.x + (world0.x - worldOffsetXY.x)),
            (this.y + (world0.y - worldOffsetXY.y))
        );
    }
    return this;
}

export default SetOrigin;