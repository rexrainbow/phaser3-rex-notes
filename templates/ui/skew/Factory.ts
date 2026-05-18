import Skew from './Skew';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('skew', function(gameObject?: any, config?: any) {
    return new Skew(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Skew', Skew);

export default Skew;