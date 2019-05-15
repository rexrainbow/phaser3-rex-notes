import Pan from './Pan.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('pan', function (gameObject, config) {
    return new Pan(this.scene, gameObject, config);
});

SetValue(window, 'RexPlugins.Gestures.Pan', Pan);

export default Pan;