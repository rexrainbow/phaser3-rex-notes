import Click from './Click.js';
import ObjectFactory from '../ObjectFactory.js';
import IsGameObject from '../../../plugins/utils/system/IsGameObject.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('click', function (gameObject, config) {
    if (!IsGameObject(gameObject)) {
        config = gameObject;
        gameObject = this.scene;
    }
    return new Click(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Click', Click);

export default Click;