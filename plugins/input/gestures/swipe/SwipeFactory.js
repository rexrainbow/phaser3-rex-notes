import Swipe from './Swipe.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('swipe', function (gameObject, config) {
    return new Swipe(this.scene, gameObject, config);
});

SetValue(window, 'RexPlugins.Gestures.Swipe', Swipe);

export default Swipe;