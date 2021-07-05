// import * as Phaser from 'phaser';
import LogicBoard from './LogicBoard';
import { IConfig } from './LogicBoard';

export default class Board<ChessType = Phaser.GameObjects.GameObject> extends LogicBoard<ChessType> {
    constructor(scene: Phaser.Scene, config?: IConfig);

    setInteractive(enable?: boolean): this;
}

export { IConfig };