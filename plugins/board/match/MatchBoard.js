var MatchBoard = function (pattern, callback, scope, getFirst) {
    // pattern: pattern list or repeat count
    var board = this.board,
        grid = board.grid;
    var dirs = grid.halfDirections,
        dir,
        dirMask = this.dirMask;
    var width = board.width,
        height = board.height;
    var matchedTileXY;
    for (var i = 0, cnt = dirs.length; i < cnt; i++) {
        dir = dirs[i];
        if (dirMask[dir] === false) {
            continue;
        }

        for (var tileY = 0; tileY < height; tileY++) {
            for (var tileX = 0; tileX < width; tileX++) {
                matchedTileXY = this.matchAtDir(pattern, tileX, tileY, dir);
                if (matchedTileXY === false) {
                    continue;
                }
                if (callback) {
                    if (scope) {
                        callback.call(scope, matchedTileXY, dir, board);
                    } else {
                        callback(matchedTileXY, dir, board);
                    }
                }
                if (getFirst) {
                    return matchedTileXY;
                }
            }
        }
    }
    return this;
}
export default MatchBoard;