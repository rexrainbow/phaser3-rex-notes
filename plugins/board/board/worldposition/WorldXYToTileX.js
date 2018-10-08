var WorldXYToTileX = function (worldX, worldY) {
    return this.grid.getTileX(worldX, worldY);
}
export default WorldXYToTileX;