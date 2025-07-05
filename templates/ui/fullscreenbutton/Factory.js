import FullscreenButton from './FullscreenButton.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('fullscreenButton', function (gameObject, config) {
    return new FullscreenButton(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.FullscreenButton', FullscreenButton);

export default FullscreenButton;