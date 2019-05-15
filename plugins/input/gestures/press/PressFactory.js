import Press from './Press.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../utils/object/SetValue.js';

ObjectFactory.register('press', function (gameObject, config) {
    return new Press(this.scene, gameObject, config);
});

SetValue(window, 'RexPlugins.Gestures.Press', Press);

export default Press;