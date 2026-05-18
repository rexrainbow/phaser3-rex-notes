import CreateChessData from '../chess/GetChessData';
import IsMiniBoardObject from '../miniboard/IsMiniBoardObject';

import { GameObjects as PhaserGameObjects } from 'phaser';
const Base = PhaserGameObjects.Image;
class Image extends Base {
    type: any;

    constructor(board?: any, tileX?: any, tileY?: any, tileZ?: any, key?: any, frame?: any, addToBoard?: any) {
        if (addToBoard === undefined) {
            addToBoard = true;
        }

        // Chess-Container
        var isMiniBoard = IsMiniBoardObject(board),
            miniBoard;
        if (isMiniBoard?: any) {
            miniBoard = board;
            board = miniBoard.board;
        }

        var scene = board.scene;
        var worldX, worldY;
        if (addToBoard?: any) {
            worldX = 0;
            worldY = 0;
        } else {
            worldX = tileX;
            worldY = tileY;
        }
        super(scene, worldX, worldY, key, frame);
        this.type = 'rexImageChess';

        if (addToBoard?: any) {
            if (isMiniBoard?: any) { // Chess-Container
                miniBoard.addChess(this, tileX, tileY, tileZ);
            } else {
                board.addChess(this, tileX, tileY, tileZ, true);
            }
        } else {
            CreateChessData(this);
        }
    }
}

export default Image;