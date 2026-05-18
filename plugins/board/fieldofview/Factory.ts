import FieldOfView from './FieldOfView';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../utils/object/SetValue';

ObjectFactory.register('fieldOfView', function(gameObject?: any, config?: any) {
    return new FieldOfView(gameObject, config);
});

SetValue(window, 'RexPlugins.Board.FieldOfView', FieldOfView);

export default FieldOfView;