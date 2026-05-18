import ClickOutside from './ClickOutside';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('clickOutside', function(gameObject?: any, config?: any) {
    return new ClickOutside(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.ClickOutside', ClickOutside);

export default ClickOutside;