const Wrap = Phaser.Math.Wrap;
var GetWrapTileY = function (tileX, tileY) {
    if (!this.infinityMode) {
        if (this.wrapMode) {
            tileY = Wrap(tileY, 0, this.height);
        } else if ((tileY < 0) || (tileY >= this.height)) {
            tileY = null;
        }
    }
    return tileY;
}
export default GetWrapTileY;