import MoveTo from './MoveTo.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from 'rexPlugins/utils/object/SetValue.js';

ObjectFactory.register('moveTo', function (gameObject, config) {
    return new MoveTo(gameObject, config);
});

SetValue(window, 'RexPlugins.Board.MoveTo', MoveTo);

export default MoveTo;