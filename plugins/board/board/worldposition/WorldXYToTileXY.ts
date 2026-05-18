var WorldXYToTileXY = function(worldX?: any, worldY?: any, out?: any) {
    return this.grid.getTileXY(worldX, worldY, out);
}
export default WorldXYToTileXY;