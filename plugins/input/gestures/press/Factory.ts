import Press from './Press';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';
import IsGameObject from '../../../utils/system/IsGameObject';

ObjectFactory.register('press', function(gameObject?: any, config?: any) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Press(gameObject, config);
});

SetValue(window, 'RexPlugins.Gestures.Press', Press);

export default Press;