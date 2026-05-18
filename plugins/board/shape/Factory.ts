import Shape from './Shape';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../utils/object/SetValue';

ObjectFactory.register('shape', function(board?: any, tileX?: any, tileY?: any, tileZ?: any, fillColor?: any, fillAlpha?: any, addToBoard?: any) {
    var gameObject = new Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard); 
    board.scene.add.existing(gameObject);  
    return gameObject;
});

SetValue(window, 'RexPlugins.Board.Shape', Shape);

export default Shape;