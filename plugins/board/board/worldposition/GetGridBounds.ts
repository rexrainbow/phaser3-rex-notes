var GetGridBounds = function(tileX?: any, tileY?: any, out?: any) {
    if (tileX && (typeof (tileX) !== 'number')) {
        out = tileY;
        var tileXY = this.chessToTileXYZ(tileX);  // tileX is a Chess or TileXY
        tileX = tileXY.x;
        tileY = tileXY.y;
    }
    return this.grid.getBounds(tileX, tileY, out);
}

export default GetGridBounds;