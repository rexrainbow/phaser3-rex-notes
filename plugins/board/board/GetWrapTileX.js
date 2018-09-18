const Wrap = Phaser.Math.Wrap;
var GetWrapTileX = function (tileX, tileY) {
    if (!this.infinityMode) {
        if (this.wrapMode) {
            tileX = Wrap(tileX, 0, this.width);
        } else if ((tileX < 0) || (tileX >= this.width)) {
            tileX = null;
        }
    }
    return tileX;
}
export default GetWrapTileX;