// import * as Phaser from 'phaser';
import Board from '../board/Board';
import MiniBoard from '../miniboard/MiniBoard';

/**
 * Polygon chess game object for a board.
 */
export default class Shape extends Phaser.GameObjects.Polygon {
    /**
     * Create a shape chess piece.
     * @param board - Board or mini board instance.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param tileZ - Tile z or layer.
     * @param fillColor - Fill color value.
     * @param fillAlpha - Fill alpha value.
     * @param addToBoard - True to add to board.
     */
    constructor(
        board: Board | MiniBoard,
        tileX: number,
        tileY: number,
        tileZ?: number,
        fillColor?: number | null,
        fillAlpha?: number | null,
        addToBoard?: boolean
    );
}
