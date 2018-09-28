import Shape from './Shape.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from 'rexPlugins/utils/object/SetValue.js';

ObjectFactory.register('shape', function (board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard) {
    return new Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard);
});

SetValue(window, 'RexPlugins.Board.Shape', Shape);

export default Shape;