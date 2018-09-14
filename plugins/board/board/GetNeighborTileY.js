var GetNeighborTileY = function (tileX, tileY, dir) {
    var tileY = this.grid.getNeighborTileY(tileX, tileY, dir);
    if (!this.infinityMode) {
        if (this.wrapMode) {
            tileY = this.getWrapTileY(tileX, tileY);
        } else if ((tileY < 0) || (tileY >= this.height)) {
            tileY = null;
        }
    }
    return tileY;
};
export default GetNeighborTileY;