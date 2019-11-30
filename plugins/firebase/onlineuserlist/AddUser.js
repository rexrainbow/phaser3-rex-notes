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
                rootRef.limitToFirst(self.maxUsers);
                return rootRef.once('value')
                    .then(function (snapshot) {
                        if (!Contains(snapshot, userID)) {
                            userRef.remove()
                                .then(function () {
                                    userRef.onDisconnect().cancel();
                                })
                            throw new Error();
                        }
                    })
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
        if (childSnapshot.val().ID === userID) {
            result = true;
            return true;
        }
    });
    return result;
}

export default AddUser;