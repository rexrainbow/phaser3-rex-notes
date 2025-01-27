var GetChessArray = function (part) {
    part = part.toLowerCase();
    var board = this.board;
    var height = board.height;

    var startY, endY;
    switch (part) {
        case 'upper':
            startY = 0;
            endY = height / 2;
            break;
        case 'lower':
            startY = height / 2;
            endY = height;
            break;
        default:
            startY = 0;
            endY = height;
            break;
    }

    var tileZ = this.chessTileZ;
    var chessArray = [];
    for (var tileY = startY; tileY < endY; tileY++) {
        for (var tileX = 0, endX = board.width; tileX < endX; tileX++) {
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