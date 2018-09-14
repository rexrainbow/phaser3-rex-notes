const Wrap = Phaser.Math.Wrap;
var GetWrapTileX = function (tileX, tileY) {
    return Wrap(tileX, 0, this.width);
}
export default GetWrapTileX;