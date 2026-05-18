import Perspective from './Perspective';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('perspective', function(gameObject?: any, config?: any) {
    return new Perspective(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Perspective', Perspective);

export default Perspective;