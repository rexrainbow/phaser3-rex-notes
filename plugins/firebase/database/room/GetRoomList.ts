var GetRoomList = function(roomType?: any, roomState?: any) {
    var self = this;
    return new Promise(function(resolve?: any, reject?: any) {
        self.roomList
            .once('roomlist.update', function(rooms?: any) {
                resolve(rooms)
            })
            .startUpdate(self.getRoomListQuery(roomType, roomState));
    })
}

export default GetRoomList;