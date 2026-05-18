import Flip from './Flip';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('flip', function(gameObject?: any, config?: any) {
    return new Flip(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Flip', Flip);

export default Flip;