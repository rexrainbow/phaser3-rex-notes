// import * as Phaser from 'phaser';
import Board from '../board/Board';
import MiniBoard from '../miniboard/MiniBoard';
import ChessData from '../chess/ChessData';

/**
 * Sprite chess game object for a board.
 */
export default class Sprite extends Phaser.GameObjects.Sprite {
    /**
     * Create a sprite chess piece.
     * @param board - Board or mini board instance.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param tileZ - Tile z or layer.
     * @param key - Texture key or texture.
     * @param frame - Texture frame.
     * @param addToBoard - True to add to board.
     */
    constructor(
        board: Board | MiniBoard,
        tileX: number,
        tileY: number,
        tileZ?: number,
        key?: string | Phaser.Textures.Texture,
        frame?: string | number,
        addToBoard?: boolean
    );

    /**
     * Chess data component.
     */
    readonly rexChess: ChessData;
}
