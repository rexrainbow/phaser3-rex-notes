import Board from './Board.js';
import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('board', function (config) {
    return new Board(this.scene, config);
});

export default Board;