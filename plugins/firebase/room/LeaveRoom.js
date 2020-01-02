var LeaveRoom = function () {
    if (!this.isInRoom()) {
        return Promise.resolve();
    }

    var self = this;
    return new Promise(function (resolve, reject) {
        // Emit 'user.leave' event -> OnLeftRoom
        self.once('leave', function () {
            resolve();
        })
        self.leftRoomFlag = true;
        if (self.isRemoveRoomWhenLeft) {
            // Remove room, include user list
            self.removeRoom()
                .catch(reject)
        } else {
            // Leave user list only        
            self.userList.leave()
                .catch(reject)
        }
    });
}

export default LeaveRoom;