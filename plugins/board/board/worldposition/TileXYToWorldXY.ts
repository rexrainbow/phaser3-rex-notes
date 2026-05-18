var TileXYToWorldXY = function(tileX?: any, tileY?: any, out?: any) {
    return this.grid.getWorldXY(tileX, tileY, out);
}
export default TileXYToWorldXY;