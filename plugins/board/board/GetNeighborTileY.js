var GetNeighborTileY = function (tileX, tileY, dir) {
    var tileY = this.grid.getNeighborTileY(tileX, tileY, dir);
    if (!this.infinityMode) {
        // TODO: wrap mode
        if ((tileY < 0) || (tileY >= this.height)) {
            return null;
        }
    }
    return tileY;
};
export default GetNeighborTileY;