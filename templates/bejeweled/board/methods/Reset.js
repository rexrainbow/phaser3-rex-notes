/* 
1. Destroy all chess
2. Fill chess
3. Break match3
*/

var Reset = function () {
    var board = this.board;
    // Destroy all chess
    board.removeAllChess(true);
    // Fill chess (with initial symbol map)
    var symbols = this.initSymbols;
    this.initSymbols = undefined;
    var boardHeight = board.height;
    if (symbols && (symbols.length === boardHeight)) {
        this.fillAllRows(symbols);
    } else {
        this.fillActivateArea(symbols);
        this.fillPrepareRows();
    }
    // Break match3
    this.breakMatch3();
}

export default Reset;