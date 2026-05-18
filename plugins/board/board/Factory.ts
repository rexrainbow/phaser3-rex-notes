import Board from './Board';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../utils/object/SetValue';

ObjectFactory.register('board', function(config?: any) {
    return new Board(this.scene, config);
});

SetValue(window, 'RexPlugins.Board.Board', Board);

export default Board;