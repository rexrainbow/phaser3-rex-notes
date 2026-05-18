var WorldXYToTileX = function(worldX?: any, worldY?: any) {
    // console.warn('Use board.worldXYToTileXY instead of (board.worldXYToTileX, board.worldXYToTileY)');
    return this.worldXYToTileXY(worldX, worldY, true).x;
}
export default WorldXYToTileX;