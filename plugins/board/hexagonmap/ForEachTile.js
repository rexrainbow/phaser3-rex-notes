// internal method
var ForEachTile = function (tileXYArray, board, callback, scope) {
    var bound = GetAABB(tileXYArray);
    var tileXY;
    for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        board.offset(tileXY, -bound.x, -bound.y, tileXY);
    }
    board.setBoardWidth(bound.width).setBoardHeight(bound.height);

    for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        if (scope) {
            callback.call(scope, tileXYArray[i], board);
        } else {
            callback(tileXYArray[i], board);
        }
    }
    return board;
}
export default ForEachTile;