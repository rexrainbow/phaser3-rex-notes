import GetRef from '../utils/GetRef.js';

var AddUser = function (userID, userName) {
    if (this.contains(userID)) {
        return this;
    }

    var rootRef = GetRef(this.database, this.rootPath);
    var userRef = rootRef.push();
    userRef.onDisconnect().remove();
    var d = {
        'ID': userID,
        'name': userName
    };
    var self = this;
    userRef.set(d)
        .then(function () {
            if (self.maxUsers > 0) {
                setTimeout(function () {
                    rootRef.limitToFirst(self.maxUsers).once('value')
                        .then(function (snapshot) {
                            if (Contains(snapshot, userID)) {
                                return;
                            }
                            // UserID is not in firstN list
                            userRef.remove()
                                .then(function () {
                                    userRef.onDisconnect().cancel();
                                });
                            self.emit('join-fail', d);
                        });
                }, 0);
            }
        })
        .catch(function (error) {
            self.emit('join-fail', d);
        });

    return this;
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