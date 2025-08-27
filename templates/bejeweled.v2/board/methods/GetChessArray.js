var GetChessArray = function () {
    var board = this.board;
    var startX = 1;
    var endX = board.width -2;
    var startY = 1;
    var endY = board.height -2;

    var tileZ = this.chessTileZ;
    var chessArray = [];
    for (var tileY = startY; tileY <= endY; tileY++) {
        for (var tileX = startX; tileX <= endX; tileX++) {
            var chess = board.tileXYZToChess(tileX, tileY, tileZ);
            if (chess === null) {
                continue;
            }
            chessArray.push(chess);
        }
    }

    return chessArray;
}

export default GetChessArray;