const GetRandom = Phaser.Utils.Array.GetRandom;

var RandomSymbol = function (board, tileX, tileY, callback, scope, excluded) {
    var symbol;
    if (Array.isArray(callback)) {
        // pick random symbol from symbol array
        var symbols = callback;
        if (excluded !== undefined) {
            var isExcludedArray = Array.isArray(excluded);
            for (var i = 0, cnt = symbols.length; i < cnt; i++) {
                symbol = symbols[i];
                if (isExcludedArray) { // excluded symbols array
                    if (excluded.indexOf(symbol) !== -1) {
                        continue;
                    }
                } else { // excluded symbol
                    if (symbol === excluded) {
                        continue;
                    }
                }
                tmpSymbolArray.push(symbol);
            }
            symbol = GetRandom(tmpSymbolArray);
            tmpSymbolArray.length = 0;
        } else {
            symbol = GetRandom(symbols);
        }

    } else if (typeof (obj) === 'function') {
        // symbols from return of callback
        if (scope) {
            symbol = callback.call(scope, board, tileX, tileY, excluded);
        } else {
            symbol = callback(board, tileX, tileY, excluded);
        }
    } else {
        // symbol value
        symbol = callback;
    }
    return symbol;
}

var tmpSymbolArray = [];
export default RandomSymbol;