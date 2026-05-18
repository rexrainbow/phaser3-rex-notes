import Image from './Image';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../utils/object/SetValue';

ObjectFactory.register('image', function(board?: any, tileX?: any, tileY?: any, tileZ?: any, key?: any, frame?: any, addToBoard?: any) {
    var gameObject = new Image(board, tileX, tileY, tileZ, key, frame, addToBoard);
    board.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Board.Image', Image);

export default Image;