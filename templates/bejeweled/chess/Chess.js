import RandomSymbol from './RandomSymobl.js';
import CreateGameObject from './CreateGameObject.js';
import MoveTo from 'rexPlugins/board/moveto/MoveTo.js';


class Chess {
    constructor(parent, tileX, tileY, symbols) {
        var board = parent.board,
            tileZ = parent.chessTileZ,
            createCallback = parent.chessCreateCallback,
            scope = parent.chessCallbackScope;
        // Get symbol
        var symbol = RandomSymbol(board, tileX, tileY, symbols, scope);
        // Create game object
        var gameObject = CreateGameObject(board, tileX, tileY, createCallback, scope);
        // Set symbol, it also fires 'changedata_symbol' event
        gameObject.setData('symbol', symbol);
        // Add to board
        board.addChess(gameObject, tileX, tileY, tileZ, true);
        this.gameObject = gameObject;
        // behaviors
        gameObject.moveTo = new MoveTo(gameObject, parent.chessMoveTo);
    }
}

export default Chess;