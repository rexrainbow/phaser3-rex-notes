var MatchAt = function (pattern, startTileXY, dir) {
    var matchNMode = typeof (pattern) === 'number';
    var patternLength;
    if (matchNMode) {
        patternLength = pattern;
        pattern = null;
    } else {
        patternLength = pattern.length;
    }

    var symbol;
    var curTileX = startTileXY.x,
        curTileY = startTileXY.y;
    var tmpTileXY;
    var board = this.board;
    var matchedTileXY = [];
    for (var i = 0; i < patternLength; i++) {
        symbol = this.getSymbol(curTileX, curTileY);
        if (!isValidSymbol(symbol)) {
            return false;
        }
        if (!isWildcardSymbol(symbol, this.wildcard)) {
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
        // get next tileXY
        tmpTileXY = board.getNeighborTileXY(curTileX, curTileY, dir);
        curTileX = tmpTileXY.x;
        curTileY = tmpTileXY.y;
    }

    return matchedTileXY;
};

var isValidSymbol = function (symbol) {
    return symbol && (symbol !== '');
}

var isWildcardSymbol = function (symbol, wildcard) {
    return wildcard && (wildcard !== '') && (symbol === wildcard);
};

export default MatchAt;