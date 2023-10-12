import Rotate from './Rotate.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';
import IsGameObject from '../../../utils/system/IsGameObject.js';

ObjectFactory.register('rotate', function (gameObject, config) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Rotate(this.scene, config);
});

SetValue(window, 'RexPlugins.Gestures.Rotate', Rotate);

export default Rotate;