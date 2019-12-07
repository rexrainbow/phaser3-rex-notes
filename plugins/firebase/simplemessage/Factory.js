import SimpleMessage from './SimpleMessage.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('simpleMessage', function (config) {
    return new SimpleMessage(this.app, config);
});

SetValue(window, 'RexPlugins.Fire.SimpleMessage', SimpleMessage);

export default SimpleMessage;