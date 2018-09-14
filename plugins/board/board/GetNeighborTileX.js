var GetNeighborTileX = function (tileX, tileY, dir) {
    var tileX = this.grid.getNeighborTileX(tileX, tileY, dir);
    if (!this.infinityMode) {
        // TODO: wrap mode
        if ((tileX < 0) || (tileX >= this.width)) {
            return null;
        }
    }
    return tileX;
};
export default GetNeighborTileX;