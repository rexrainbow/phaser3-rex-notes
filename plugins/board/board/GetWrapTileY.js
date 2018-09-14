const Wrap = Phaser.Math.Wrap;
var GetWrapTileY = function (tileX, tileY) {
    return Wrap(tileY, 0, this.height);
}
export default GetWrapTileY;