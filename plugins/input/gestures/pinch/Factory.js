import Pinch from './Pinch.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';
import IsGameObject from '../../../utils/system/IsGameObject.js';

ObjectFactory.register('pinch', function (gameObject, config) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Pinch(gameObject, config);
});

SetValue(window, 'RexPlugins.Gestures.Pinch', Pinch);

export default Pinch;