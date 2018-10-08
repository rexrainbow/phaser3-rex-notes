import MirrorTransfer from './transferfunctions/Mirror.js';
import ResetChessTileXYZ from './ResetChessTileXYZ.js';

var Mirror = function (mode) {
    var isOnMainBoard = (this.mainboard != null);
    if (isOnMainBoard) {
        this.pullOutFromMainBoard();
    }
    var newTileXYZMap = MirrorTransfer.call(this, mode);
    ResetChessTileXYZ.call(this, newTileXYZMap);
    if (isOnMainBoard) {
        this.putBack();
    }
    return this;
}
export default Mirror;