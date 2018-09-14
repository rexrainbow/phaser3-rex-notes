var GetNeighborTileX = function (tileX, tileY, dir) {
    var tileX = this.grid.getNeighborTileX(tileX, tileY, dir);
    if (!this.infinityMode) {
        if (this.wrapMode) {
            tileX = this.getWrapTileX(tileX, tileY);
        } else if ((tileX < 0) || (tileX >= this.width)) {
            tileX = null;
        }
    }
    return tileX;
};
export default GetNeighborTileX;