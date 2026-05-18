import MoveTo from './MoveTo';
import MiniBoardMoveTo from '../miniboard/moveto/MoveTo';
import IsMiniBoardObject from '../miniboard/IsMiniBoardObject';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../utils/object/SetValue';

ObjectFactory.register('moveTo', function(gameObject?: any, config?: any) {
    var klass = (IsMiniBoardObject(gameObject)) ? MiniBoardMoveTo : MoveTo;
    return new klass(gameObject, config);
});

SetValue(window, 'RexPlugins.Board.MoveTo', MoveTo);
SetValue(window, 'RexPlugins.Board.MiniBoardMoveTo', MiniBoardMoveTo);

export default MoveTo;