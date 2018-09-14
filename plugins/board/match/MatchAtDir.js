var MatchAtDir = function (pattern, startTileX, startTileY, direction) {
    // pattern: pattern list or repeat count
    var matchNMode = typeof (pattern) === 'number';
    var patternLength;
    if (matchNMode) {
        patternLength = pattern;
        pattern = null;
    } else {
        patternLength = pattern.length;
    }

    var symbol, wildcard = this.wildcard;
    var curTileX, curTileY;
    var tmpTileX, tmpTileY;
    var board = this.board;
    var matchedTileXY = result.tileXY;
    matchedTileXY.length = 0;
    for (var i = 0; i < patternLength; i++) {
        if (curTileX === undefined) {
            curTileX = startTileX
            curTileY = startTileY;
        } else {
            // get next tileXY
            tmpTileX = board.getNeighborTileX(curTileX, curTileY, direction);
            tmpTileY = board.getNeighborTileY(curTileX, curTileY, direction);
            if ((tmpTileX === null) || (tmpTileY === null)) {
                return false;
            }
            curTileX = tmpTileX;
            curTileY = tmpTileY;
        }

        symbol = this.getSymbol(curTileX, curTileY);
        if (symbol == null) {
            return false;
        }
        if (symbol !== wildcard) {
            if (matchNMode) {
                if (pattern === null) {
                    pattern = symbol;
                } else if (pattern !== symbol) {
                    return false;
                }
            } else if (pattern[i] !== symbol) { // pattern list mode
                return false;
            }
        }

        matchedTileXY.push({
            x: curTileX,
            y: curTileY
        });
    }

    result.direction = direction;
    result.pattern = pattern;
    return result;
};

var result = {
    tileXY : [],
    direction: undefined,
    pattern: undefined
};
export default MatchAtDir;