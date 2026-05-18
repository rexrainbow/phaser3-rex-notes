import GetValue from '../../../utils/object/GetValue';
import Shuffle from '../../../utils/array/Shuffle';

var JoinRandomRoom = function(config?: any) {
    if (config === undefined) {
        config = {};
    }

    var roomType = GetValue(config, 'roomType', '');
    var roomState = GetValue(config, 'door', 'open');
    var self = this;
    return this.getRoomList(roomType, roomState)
        .then(function(rooms?: any) {
            Shuffle(rooms);
            return JoinNextRoom.call(self, config, rooms, 0);
        })
}

var JoinNextRoom = function(config?: any, rooms?: any, index?: any) {
    if (index === rooms.length) {
        return Promise.reject();
    }
    config.roomID = rooms[index].roomID;
    index++;
    var self = this;
    return this.joinRoom(config)
        .catch(function() {
            return JoinNextRoom.call(self, config, rooms, index);
        })
}

export default JoinRandomRoom;