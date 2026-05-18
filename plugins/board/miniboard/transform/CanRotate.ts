import RotateTransfer from './transferfunctions/Rotate';

var CanRotate = function(direction?: any) {
    if (this.mainBoard === null) {
        return true;
    }
    var newTileXYZMap = RotateTransfer.call(this, direction);
    return this.canPutOnMainBoard(this.mainBoard, tileX, tileY, newTileXYZMap);
}
export default CanRotate;