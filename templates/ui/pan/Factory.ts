import Pan from './Pan';
import ObjectFactory from '../ObjectFactory';
import IsGameObject from '../../../plugins/utils/system/IsGameObject';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('pan', function(gameObject?: any, config?: any) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Pan(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Pan', Pan);

export default Pan;