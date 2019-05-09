import Swipe from './Swipe.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('swipe', function (config) {
    return new Swipe(this.scene, config);
});

SetValue(window, 'RexPlugins.Gestures.Swipe', Swipe);

export default Swipe;