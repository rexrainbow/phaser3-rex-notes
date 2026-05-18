import SingleRoom from './SingleRoom';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';

ObjectFactory.register('singleRoom', function(config?: any) {
    return new SingleRoom(config);
});

SetValue(window, 'RexPlugins.Fire.SingleRoom', SingleRoom);

export default SingleRoom;