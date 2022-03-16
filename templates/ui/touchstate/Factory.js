import TouchState from './TouchState.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('touchState', function (gameObject, config) {
    return new TouchState(gameObject, config);
});

SetValue(window, 'RexPlugins.UI.TouchState', TouchState);

export default TouchState;