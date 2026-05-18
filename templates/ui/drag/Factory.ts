import Drag from './Drag';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('drag', function(gameObject?: any, config?: any) {
    return new Drag(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Drag', Drag);

export default Drag;