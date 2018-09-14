import MatchAt from './MatchAt.js';
var MatchHexagon = function (pattern, getFirst, callback, scope) {
    var board = this.board;
    var width = board.width,
        height = board.height;
    var matched, hasMatched = false;
    for (var dir = 0; dir < 3; dir++) { // dir = 0,1,2
        for (var tileY = 0; tileY < height; tileY++) {
            for (var tileX = 0; tileX < width; tileX++) {
                matched = MatchAt(pattern, tileX, tileY, dir);
                if (matched === false) {
                    continue;
                } else {
                    hasMatched = true;
                }
                if (callback) {
                    if (scope) {
                        callback.call(scope, matched, dir, board);
                    } else {
                        callback(matched, dir, board);
                    }
                }
                if (getFirst) {
                    return true;
                }
            }
        }
    }
    return hasMatched;
}
export default MatchHexagon;