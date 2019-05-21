import Tap from './Tap.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('tap', function (gameObject, config) {
    return new Tap(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Tap', Tap);

export default Tap;