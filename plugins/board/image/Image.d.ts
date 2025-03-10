// import * as Phaser from 'phaser';
import Board from '../board/Board';
import MiniBoard from '../miniboard/MiniBoard';
import ChessData from '../chess/ChessData';

export default class Image extends Phaser.GameObjects.Image {
    constructor(
        board: Board | MiniBoard,
        tileX: number, tileY: number, tileZ?: number,
        key?: string | Phaser.Textures.Texture, frame?: string | number,
        addToBoard?: boolean
    );

    readonly rexChess: ChessData;
}