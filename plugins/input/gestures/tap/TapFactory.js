import Tap from './Tap.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('tap', function (config) {
    return new Tap(this.scene, config);
});

SetValue(window, 'RexPlugins.Gestures.Tap', Tap);

export default Tap;