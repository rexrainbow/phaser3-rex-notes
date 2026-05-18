var MatchBoard = function(pattern?: any, callback?: any, scope?: any, getFirst?: any) {
    // pattern: pattern list or repeat count
    var board = this.board,
        grid = board.grid;
    var directions = grid.halfDirections,
        dir,
        dirMask = this.dirMask;
    var width = board.width,
        height = board.height;
    var result, isBreak;
    for (var i = 0, cnt = directions.length; i < cnt; i++) {
        dir = directions[i];
        if (dirMask[dir] === false) {
            continue;
        }

        for (var tileY = 0; tileY < height; tileY++) {
            for (var tileX = 0; tileX < width; tileX++) {
                result = this.matchAtDir(pattern, tileX, tileY, dir);
                if (result === false) {
                    continue;
                }

                if (callback?: any) {
                    if (scope?: any) {
                        isBreak = callback.call(scope, result, board);
                    } else {
                        isBreak = callback(result, board);
                    }
                }
                if (getFirst?: any) {
                    return result;
                }

                if (isBreak?: any) {
                    break;
                }
            }

            if (isBreak?: any) {
                break;
            }
        }
    }
    return this;
}
export default MatchBoard;