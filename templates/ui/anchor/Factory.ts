import Anchor from "./Anchor";
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('anchor', function(gameObject?: any, config?: any) {
    return new Anchor(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Anchor', Anchor);

export default Anchor;