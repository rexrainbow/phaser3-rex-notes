import Press from './Press.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('press', function (gameObject, config) {
    return new Press(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.Press', Press);

export default Press;