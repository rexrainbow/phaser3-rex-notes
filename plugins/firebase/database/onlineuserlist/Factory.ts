import OnlineUserList from './OnlineUserList';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';

ObjectFactory.register('onlineUserList', function(config?: any) {
    return new OnlineUserList(config);
});

SetValue(window, 'RexPlugins.Fire.OnlineUserList', OnlineUserList);

export default OnlineUserList;