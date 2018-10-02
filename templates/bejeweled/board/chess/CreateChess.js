import RandomSymbol from './RandomSymobl.js';

var CreateChess = function (tileX, tileY, symbols) {
    var scene = this.scene,
        board = this.board,
        scope = this.chessCallbackScope;

    // Get symbol
    var symbol = RandomSymbol(board, tileX, tileY, symbols, scope);
    // Create game object
    var gameObject;
    if (scope) {
        gameObject = this.chessCreateCallback.call(scope, board, tileX, tileY);
    } else {
        gameObject = this.chessCreateCallback(board, tileX, tileY);
    }
    // Set symbol, it also fires 'changedata_symbol' event
    gameObject.setData('symbol', symbol);
    // Add to board
    board.addChess(gameObject, tileX, tileY, this.chessTileZ, true);
    // Add blocker
    gameObject.rexChess.setBlocker();
    // behaviors
    gameObject.moveTo = scene.rexBoard.add.moveTo(gameObject, this.chessMoveTo);
}

export default CreateChess;