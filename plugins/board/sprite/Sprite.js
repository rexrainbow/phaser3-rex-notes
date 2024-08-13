import CreateChessData from '../chess/GetChessData.js';
import IsMiniBoardObject from '../miniboard/IsMiniBoardObject.js';

const Base = Phaser.GameObjects.Sprite;
class Sprite extends Base {
    constructor(board, tileX, tileY, tileZ, key, frame, addToBoard) {
        if (addToBoard === undefined) {
            addToBoard = true;
        }

        // Chess-Container
        var isMiniBoard = IsMiniBoardObject(board),
            miniBoard;
        if (isMiniBoard) {
            miniBoard = board;
            board = miniBoard.board;
        }

        var scene = board.scene;
        var worldX, worldY;
        if (addToBoard) {
            worldX = 0;
            worldY = 0;
        } else {
            worldX = tileX;
            worldY = tileY;
        }
        super(scene, worldX, worldY, key, frame);
        this.type = 'rexSpriteChess';

        if (addToBoard) {
            if (isMiniBoard) { // Chess-Container
                miniBoard.addChess(this, tileX, tileY, tileZ);
            } else {
                board.addChess(this, tileX, tileY, tileZ, true);
            }
        } else {
            CreateChessData(this);
        }
    }
}

export default Sprite;