import Messages from './Messages';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';

ObjectFactory.register('messages', function(config?: any) {
    return new Messages(config);
});

SetValue(window, 'RexPlugins.Fire.Messages', Messages);

export default Messages;