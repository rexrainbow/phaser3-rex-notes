import RefreshSymbolsCallback from './RefreshSymbols.js';

var GetMatchLines = function (n, callback, scope) {
    this.match
        .refreshSymbols(RefreshSymbolsCallback, this)
        // Pick each match3 line
        .match(n, callback, scope);
    return this;
}

export default GetMatchLines;