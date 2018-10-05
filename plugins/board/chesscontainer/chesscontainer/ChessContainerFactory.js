import ChessContainer from './ChessContainer.js';
import ObjectFactory from '../../ObjectFactory.js';
import SetValue from 'rexPlugins/utils/object/SetValue.js';

ObjectFactory.register('chessContainer', function (x, y, config) {
    return new ChessContainer(this.scene, x, y, config);
});

SetValue(window, 'RexPlugins.Board.ChessContainer', ChessContainer);

export default ChessContainer;