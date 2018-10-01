import RandomSymbol from './RandomSymobl.js';
import CreateGameObject from './CreateGameObject.js';
import MoveTo from 'rexPlugins/board/moveto/MoveTo.js';


class Chess {
    constructor(board, tileX, tileY, tileZ,
        symbols,
        createCallback,
        scope
    ) {
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
        this.moveTo = new MoveTo(gameObject, {
            blockerTest: true,
        });
    }
}

export default Chess;