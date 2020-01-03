var ChangeUserName = function (userName) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.userName = userName;
        var userRef = self.getUserRef();
        if (userRef) { // Find userRef
            resolve(userRef)
        } else { // Query userRef
            var query = self.getRootRef().orderByChild('userID').equalTo(self.userID);
            query.once('child_added')
                .then(function (snapshot) {
                    resolve(snapshot.ref)
                })
        }
    })
        .then(function (userRef) { // Set userName
            return userRef.child('userName').set(userName)
        })
}

export default ChangeUserName;