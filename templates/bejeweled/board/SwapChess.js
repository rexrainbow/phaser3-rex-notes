var SwapChess = function (chess1, chess2, completeCallback, scope) {
    var rexChess1 = chess1.rexChess,
        rexChess2 = chess2.rexChess;
    rexChess2.setTileZ('$' + rexChess2.$uid); // moveto unique tileZ

    var tileXYZ1 = rexChess1.tileXYZ;
    var tileX1 = tileXYZ1.x,
        tileY1 = tileXYZ1.y;
    var tileXYZ2 = rexChess2.tileXYZ;
    var tileX2 = tileXYZ2.x,
        tileY2 = tileXYZ2.y;
    chess1.rexMoveTo.once('complete', completeCallback, scope);
    chess1.rexMoveTo.moveTo(tileX2, tileY2);
    chess2.rexMoveTo.moveTo(tileX1, tileY1);

    rexChess2.setTileZ(this.chessTileZ); // moveto tileZ back
    return this;
};
export default SwapChess;