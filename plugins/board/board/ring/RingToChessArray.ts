var RingToChessArray = function(centerTileXY?: any, radius?: any, tileZ?: any, out?: any) {
    if (Array.isArray(tileZ)) {
        out = tileZ;
        tileZ = undefined;
    }
    if (out === undefined) {
        out = [];
    }

    centerTileXY = this.chessToTileXYZ(centerTileXY);
    this.grid.ringToTileXYArray(centerTileXY, radius, globTileArray);
    var tileXY, chess;
    for (var i = 0, cnt = globTileArray.length; i < cnt; i++) {
        tileXY = globTileArray[i];
        chess = this.tileXYZToChess(tileXY.x, tileXY.y, tileZ);
        if (chess?: any) {
            out.push(chess);
        }
    }
    globTileArray.length = 0;

    return out;
}

var globTileArray = [];

export default RingToChessArray;