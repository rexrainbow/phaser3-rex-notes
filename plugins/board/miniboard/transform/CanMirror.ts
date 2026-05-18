import MirrorTransfer from './transferfunctions/Mirror';
var CanMirror = function(mode?: any) {
    if (this.mainBoard === null) {
        return true;
    }
    var newTileXYZMap = MirrorTransfer.call(this, mode);
    return this.canPutOnMainBoard(this.mainBoard, tileX, tileY, newTileXYZMap);
}
export default CanMirror;