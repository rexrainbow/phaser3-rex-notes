var GetOppositeDirection = function(tileX?: any, tileY?: any, direction?: any) {
    if (tileX && (typeof (tileX) !== 'number')) {
        direction = tileY;
        var chess = tileX;
        var tileXY = this.chessToTileXYZ(chess);
        tileX = tileXY.x;
        tileY = tileXY.y;
    }
    return this.grid.getOppositeDirection(tileX, tileY, direction);
}
export default GetOppositeDirection;