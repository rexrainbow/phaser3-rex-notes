import Press from './Press';
import ObjectFactory from '../ObjectFactory';
import IsGameObject from '../../../plugins/utils/system/IsGameObject';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('press', function(gameObject?: any, config?: any) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Press(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Press', Press);

export default Press;