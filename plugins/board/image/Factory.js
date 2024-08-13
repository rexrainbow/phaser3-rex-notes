import Image from './Image.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('image', function (board, tileX, tileY, tileZ, key, frame, addToBoard) {
    var gameObject = new Image(board, tileX, tileY, tileZ, key, frame, addToBoard);
    board.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Board.Image', Image);

export default Image;