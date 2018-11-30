import Shape from './Shape.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('shape', function (board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard) {
    var shape = new Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard);   
    return board.scene.sys.displayList.add(shape);
});

SetValue(window, 'RexPlugins.Board.Shape', Shape);

export default Shape;