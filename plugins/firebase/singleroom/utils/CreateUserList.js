import OnlineUserList from '../../onlineuserlist/OnlineUserList.js';
import GetValue from '../../../utils/object/GetValue.js';

var CreateUserList = function (config) {
    var userList = new OnlineUserList({
        eventEmitter: this.getEventEmitter(),
        eventNames: {
            join: 'userlist.join', // Any user join
            leave: 'userlist.leave', // Any user leave
            update: 'userlist.update', // Update user list
            init: 'userlist.init',
            changename: 'userlist.changename'
        },

        root: this.getUserListPath(),
        userID: this.userInfo,
        maxUsers: GetValue(config, 'maxUsers', 0)
    });

    userList
        .on('userlist.leave', function (user) {
            if (user.userID === this.userID) {
                OnLeftRoom.call(this);  // Current user is left or kicked
            }
        }, this)

    this
        .on('join', function () {
            userList
                .startUpdate()
        })
        .on('leave', function () {
            userList
                .stopUpdate()
                .clear()
        })

    return userList;
}

var OnLeftRoom = function () {
    this.emit('leave');

    // Clear room info later
    var self = this;
    setTimeout(function () {
        self.leftRoomFlag = false;
    }, 0);
}

export default CreateUserList;