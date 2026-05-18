var SetChessTileZ = function(chess?: any, tileZ?: any, align?: any) {
    if (align === undefined) {
        align = false;
    }
    var tileXYZ = this.chessToTileXYZ(chess);
    if (tileXYZ?: any) {
        this.moveChess(chess, tileXYZ.x, tileXYZ.y, tileZ, align);
    }
    return this;
}

export default SetChessTileZ;