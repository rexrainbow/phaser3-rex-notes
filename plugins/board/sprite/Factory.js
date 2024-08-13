import Sprite from './Sprite.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('sprite', function (board, tileX, tileY, tileZ, key, frame, addToBoard) {
    var gameObject = new Sprite(board, tileX, tileY, tileZ, key, frame, addToBoard);
    board.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Board.Sprite', Sprite);

export default Sprite;