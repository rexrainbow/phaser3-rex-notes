import Const from './Const.js';
import GetRef from '../utils/GetRef.js';

var CreateRoom = function (config) {
    var roomID = GetValue(config, 'roomID', undefined);
    var roomName = GetValue(config, 'roomName', '');
    var roomType = GetValue(config, 'roomType', '');
    var maxUsers = GetValue(config, 'maxUsers', 0);
    var isPersistedRoom = GetValue(config, 'presisted', false);
    var doorState = GetValue(config, 'door', 'open'); // 0(close), 1(open)

    if (typeof (doorState) === 'string') {
        doorState = Const[doorState];
    }
}

export default CreateRoom;