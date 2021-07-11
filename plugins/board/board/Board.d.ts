// import * as Phaser from 'phaser';
import LogicBoard from './LogicBoard';

export default Board;

declare namespace Board {
    interface IConfig extends LogicBoard.IConfig { }
}

declare class Board<ChessType = Phaser.GameObjects.GameObject> extends LogicBoard<ChessType> {
    constructor(scene: Phaser.Scene, config?: Board.IConfig);

    setInteractive(enable?: boolean): this;
}