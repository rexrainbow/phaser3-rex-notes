import Room from './Room';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';

ObjectFactory.register('room', function(config?: any) {
    return new Room(config);
});

SetValue(window, 'RexPlugins.Fire.Room', Room);

export default Room;