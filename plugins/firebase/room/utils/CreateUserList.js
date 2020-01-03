import OnlineUserList from '../../onlineuserlist/OnlineUserList.js';
import OnLeftRoom from './OnLeftRoom.js';

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
        .on('user.leave', function (user) {
            if (user.userID === this.userID) {
                OnLeftRoom.call(this);  // Current user is left or kicked
            }
        }, this)
        .setUser(this.userInfo);

    return userList;
}

export default CreateUserList;