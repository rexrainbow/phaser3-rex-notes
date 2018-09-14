var MatchAtDir = function (pattern, startTileX, startTileY, callback, scope, getFirst) {
    // pattern: pattern list or repeat count
    var board = this.board,
        grid = board.grid;
    var dirs = grid.fullDirections,
        dir,
        dirMask = this.dirMask;
    var matchedTileXY;
    for (var i = 0, cnt = dirs.length; i < cnt; i++) {
        dir = dirs[i];
        if (dirMask[dir] === false) {
            continue;
        }

        matchedTileXY = this.matchAtDir(pattern, startTileX, startTileY, dir);
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

    return this;
};

export default MatchAtDir;