import GetRef from '../utils/GetRef.js';
import Delay from '../../utils/promise/Delay.js';

var AddUser = function (userID, userName) {
    if (this.contains(userID)) {
        return Promise.resolve();  // Promise
    }

    var rootRef = GetRef(this.database, this.rootPath);
    var userRef = rootRef.push();
    userRef.onDisconnect().remove();
    var d = {
        'ID': userID,
        'name': userName
    };
    if (this.maxUsers === 0) {
        return userRef.set(d);
    }

    var self = this;
    return userRef.set(d)
        .then(function () {
            return Delay(0);
        })
        .then(function () {
            return rootRef.limitToFirst(self.maxUsers).once('value');
        })
        .then(function (snapshot) {
            if (Contains(snapshot, userID)) {
                return Promise.resolve();
            }
            // UserID is not in firstN list
            userRef.remove()
                .then(function () {
                    userRef.onDisconnect().cancel();
                });
            return Promise.reject();
        })
        .catch(function (error) {
            self.emit('join-fail', d);
            return Promise.reject();
        });
};

var Contains = function (snapshot, userID) {
    var result = false;
    snapshot.forEach(function (childSnapshot) {
        var user = childSnapshot.val();
        if (user.ID === userID) {
            result = true;
            return true;
        }
    });
    return result;
}

export default AddUser;