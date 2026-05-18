import Shake from './Shake';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('shake', function(gameObject?: any, config?: any) {
    return new Shake(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Shake', Shake);

export default Shake;