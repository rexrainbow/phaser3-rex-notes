import Shape from 'rexPlugins/board/shape/Shape.js';
import MoveTo from 'rexPlugins/board/moveto/MoveTo.js';

class Chess {
    constructor(board, tileX, tileY, tileZ, symbol, createGameObjectCallback, createGameObjectScope) {
        var scene = board.scene;
        var gameObject;
        if (createGameObjectCallback) {
            if (createGameObjectScope) {
                gameObject = createGameObjectCallback.call(createGameObjectCallback, scene, symbol, tileX, tileY, tileZ);
            } else {
                gameObject = createGameObjectCallback(scene, symbol, tileX, tileY, tileZ);
            }
        } else {
            // default chess object
            gameObject = new Shape(board, 0, 0, 0, getColor(symbol), 1, false);
            scene.add.existing(gameObject);
        }
        board.addChess(gameObject, tileX, tileY, tileZ, true);
        this.gameObject = gameObject;
        // behaviors
        this.moveTo = new MoveTo(gameObject, {
            blockerTest: true,
        });
    }
}

var colorArray = Phaser.Display.Color.HSVColorWheel(0.5, 1);
var getColor = function (symbol) {
    // symbol: 0 ~ 5
    return colorArray[symbol * 60].color;
}

export default Chess;