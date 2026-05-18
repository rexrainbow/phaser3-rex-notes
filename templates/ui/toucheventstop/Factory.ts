import TouchEventStop from './TouchEventStop';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('touchEventStop', function(gameObject?: any, config?: any) {
    return new TouchEventStop(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.TouchEventStop', TouchEventStop);

export default TouchEventStop;