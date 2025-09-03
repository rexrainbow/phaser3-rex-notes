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
        gameObject = this.chessCreateCallback.call(scope, board);
    } else {
        gameObject = this.chessCreateCallback(board);
    }

    // Set swappable to true by default
    gameObject.setData('swappable', true);
    // Set clickable to false by default
    gameObject.setData('clickable', false);

    // Set symbol, it also fires 'changedata-symbol' event
    gameObject.setData('symbol', symbol);
    // Add to board
    board.addChess(gameObject, tileX, tileY, this.chessTileZ, true);
    // behaviors
    gameObject.rexMoveTo = this.rexBoard.add.moveTo(gameObject, this.chessMoveTo);

    if (this.layer) {
        // Move chess gameObject from scene to layer
        this.layer.add(gameObject);
    }
}

export default CreateChess;