import RefreshSymbolsCallback from './RefreshSymbols.js';

var AnyMatchLine = function (n) {
    return this.match
        .refreshSymbols(RefreshSymbolsCallback, this)
        .anyMatch(n);
}

export default AnyMatchLine;