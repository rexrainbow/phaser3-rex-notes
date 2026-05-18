import Tap from './Tap';
import ObjectFactory from '../ObjectFactory';
import IsGameObject from '../../../plugins/utils/system/IsGameObject';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('tap', function(gameObject?: any, config?: any) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Tap(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Tap', Tap);

export default Tap;