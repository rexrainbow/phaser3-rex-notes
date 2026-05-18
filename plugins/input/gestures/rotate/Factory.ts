import Rotate from './Rotate';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';
import IsGameObject from '../../../utils/system/IsGameObject';

ObjectFactory.register('rotate', function(gameObject?: any, config?: any) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Rotate(this.scene, config);
});

SetValue(window, 'RexPlugins.Gestures.Rotate', Rotate);

export default Rotate;