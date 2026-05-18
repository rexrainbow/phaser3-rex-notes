import Sprite from './Sprite';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../utils/object/SetValue';

ObjectFactory.register('sprite', function(board?: any, tileX?: any, tileY?: any, tileZ?: any, key?: any, frame?: any, addToBoard?: any) {
    var gameObject = new Sprite(board, tileX, tileY, tileZ, key, frame, addToBoard);
    board.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Board.Sprite', Sprite);

export default Sprite;