import StackMessage from './StackMessage.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('stackMessage', function (config) {
    return new StackMessage(this.app, config);
});

SetValue(window, 'RexPlugins.Fire.StackMessage', StackMessage);

export default StackMessage;