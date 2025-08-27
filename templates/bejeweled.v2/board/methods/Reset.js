/* 
1. Destroy all chess
2. Fill activate area
3. Break match3
*/

var Reset = function () {
    // Destroy all chess
    this.clear();
    // Fill chess (with initial symbol map)
    var symbols = this.initSymbols;
    this.initSymbols = undefined;
    this.fillActivateArea(symbols);
    // Break match3
    this.breakMatch3();
}

export default Reset;