import Pinch from './Pinch';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';
import IsGameObject from '../../../utils/system/IsGameObject';

ObjectFactory.register('pinch', function(gameObject?: any, config?: any) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Pinch(gameObject, config);
});

SetValue(window, 'RexPlugins.Gestures.Pinch', Pinch);

export default Pinch;