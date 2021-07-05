import * as Phaser from 'phaser';
import Board from '../board/LogicBoard';

export default class Shape extends Phaser.GameObjects.Polygon {
    constructor(
        board: Board,
        tileX: number, tileY: number, tileZ?: number,
        fillColor?: number | null, fillAlpha?: number | null,
        addToBoard?: boolean
    );    
}