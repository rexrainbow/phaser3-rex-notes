var GetTileXYArray = function(board?: any, chessArray?: any) {
    var tileXYArray = [];
    if (chessArray === undefined) {
        board.forEachTileXY(function(tileXY?: any, board?: any) {
            tileXYArray.push({ x: tileXY.x, y: tileXY.y });
        })

    } else {
        if (typeof (chessArray) === 'number') {
            var tileZ = chessArray;
            chessArray = board.tileZToChessArray(tileZ);
        }
        for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
            tileXYArray.push(board.chessToTileXYZ(chessArray[i]));
        }
    }


    return tileXYArray;
}

export default GetTileXYArray;