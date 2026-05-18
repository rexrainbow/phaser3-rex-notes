import InTouching from './InTouching';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('inTouching', function(gameObject?: any, config?: any) {
    return new InTouching(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.InTouching', InTouching);

export default InTouching;