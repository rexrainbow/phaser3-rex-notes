var GetTileX = function(worldX?: any, worldY?: any) {
    return this.getTileXY(worldX, worldY, true).x;
}

export default GetTileX;