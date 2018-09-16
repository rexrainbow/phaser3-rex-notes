import ChessGroup from './ChessGroup.js';
import ObjectFactory from '../ObjectFactory.js';

ObjectFactory.register('chessGroup', function (children) {
    return new ChessGroup(this.scene, children);
});

export default ChessGroup;