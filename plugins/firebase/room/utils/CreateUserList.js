import OnlineUserList from '../../onlineuserlist/OnlineUserList.js';

var CreateUserList = function (config) {
    var userList = new OnlineUserList({
        eventEmitter: this.getEventEmitter(),
        eventNames: {
            join: 'userlist.join', // Any user join
            leave: 'userlist.leave', // Any user leave
            update: 'userlist.update', // Update user list
            init: 'userlist.init'
        }
    });
    userList
        .on('userlist.leave', function (user) {
            if (user.userID === this.userID) {
                OnLeftRoom.call(this);  // Current user is left or kicked
            }
        }, this)
        .setUser(this.userInfo);

    return userList;
}

var OnLeftRoom = function () {
    this.userList
        .stopUpdate()
        .clear()

    // Clear room info later
    var self = this;
    setTimeout(function () {
        self.roomID = undefined;
        self.roomName = undefined;
        self.doorState = undefined;
        self.leftRoomFlag = false;
    }, 0);
}

export default CreateUserList;