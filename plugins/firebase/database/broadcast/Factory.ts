import Broadcast from './Broadcast';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';

ObjectFactory.register('broadcast', function(config?: any) {
    return new Broadcast(config);
});

SetValue(window, 'RexPlugins.Fire.Broadcast', Broadcast);

export default Broadcast;