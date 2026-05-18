import Swipe from './Swipe';
import ObjectFactory from '../ObjectFactory';
import IsGameObject from '../../../plugins/utils/system/IsGameObject';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('swipe', function(gameObject?: any, config?: any) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Swipe(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Swipe', Swipe);

export default Swipe;