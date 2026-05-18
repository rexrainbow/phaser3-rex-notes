import Swipe from './Swipe';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';
import IsGameObject from '../../../utils/system/IsGameObject';

ObjectFactory.register('swipe', function(gameObject?: any, config?: any) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Swipe(gameObject, config);
});

SetValue(window, 'RexPlugins.Gestures.Swipe', Swipe);

export default Swipe;