import Click from './Click';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('click', function(gameObject?: any, config?: any) {
    return new Click(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Click', Click);

export default Click;