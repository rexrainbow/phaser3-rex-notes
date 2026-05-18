import Tap from './Tap';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';
import IsGameObject from '../../../utils/system/IsGameObject';

ObjectFactory.register('tap', function(gameObject?: any, config?: any) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Tap(gameObject, config);
});

SetValue(window, 'RexPlugins.Gestures.Tap', Tap);

export default Tap;