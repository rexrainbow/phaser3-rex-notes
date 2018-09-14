var MatchAt = function (pattern, startTileX, startTileY, dir) {
    var matchNMode = typeof (pattern) === 'number';
    var patternLength;
    if (matchNMode) {
        patternLength = pattern;
        pattern = null;
    } else {
        patternLength = pattern.length;
    }

    var symbol;
    var curTileX, curTileY;
    var tmpTileX, tmpTileY;
    var board = this.board;
    var matchedTileXY = [];
    for (var i = 0; i < patternLength; i++) {
        if (curTileX === undefined) {
            curTileX = startTileX
            curTileY = startTileY;
        } else {
            // get next tileXY
            tmpTileX = board.getNeighborTileX(curTileX, curTileY, dir);
            tmpTileY = board.getNeighborTileY(curTileX, curTileY, dir);
            curTileX = tmpTileX;
            curTileY = tmpTileY;
        }

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