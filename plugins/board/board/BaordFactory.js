import Board from './Board.js';
import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('board', function (config) {
    return new Board(this.scene, config);
});

if (Phaser.rexBoard === undefined) {
    Phaser.rexBoard = {};
}
Phaser.rexBoard.Board = Board;

export default Board;