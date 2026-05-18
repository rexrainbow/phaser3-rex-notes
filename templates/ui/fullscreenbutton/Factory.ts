import FullscreenButton from './FullscreenButton';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('fullscreenButton', function(gameObject?: any, config?: any) {
    return new FullscreenButton(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.FullscreenButton', FullscreenButton);

export default FullscreenButton;