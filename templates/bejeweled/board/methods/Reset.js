/* 
1. Destroy all chess
2. Fill chess
3. Break match3
*/

var Reset = function () {
    // Destroy all chess
    this.board.removeAllChess(true);
    // Fill chess (with initial symbol map)
    var symbols = this.initSymbols;
    this.initSymbols = undefined;
    this.fill(symbols);
    // Break match3
    this.breakMatch3();
}

export default Reset;