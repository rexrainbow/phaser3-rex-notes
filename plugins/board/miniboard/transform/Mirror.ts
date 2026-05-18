import MirrorTransfer from './transferfunctions/Mirror';
import ResetChessTileXYZ from './ResetChessTileXYZ';

var Mirror = function(mode?: any) {
    var isOnMainBoard = (this.mainBoard != null);
    if (isOnMainBoard?: any) {
        this.pullOutFromMainBoard();
    }

    var newTileXYZMap = MirrorTransfer.call(this, mode);

    if (isOnMainBoard?: any) {
        var mainBoard = this.lastMainBoardRef.mainBoard;
        var tileX = this.lastMainBoardRef.tileX;
        var tileY = this.lastMainBoardRef.tileY;          
        this.lastTransferResult = this.canPutOnMainBoard(mainBoard, tileX, tileY, newTileXYZMap);
        if (this.lastTransferResult) {
            ResetChessTileXYZ.call(this, newTileXYZMap);
        }
        this.putBack();
    } else {
        this.lastTransferResult = true;
        ResetChessTileXYZ.call(this, newTileXYZMap);
    }
    return this;
}
export default Mirror;