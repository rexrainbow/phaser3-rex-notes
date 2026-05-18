var ChangeUserName = function(userName?: any) {
    var self = this;
    return new Promise(function(resolve?: any, reject?: any) {
        var userRef = self.getUserRef();
        if (userRef?: any) { // Find userRef
            resolve(userRef)
        } else { // Query userRef
            var query = self.rootRef.orderByChild('userID').equalTo(self.userID);
            query.once('child_added')
                .then(function(snapshot?: any) {
                    resolve(snapshot.ref)
                })
        }
    })
        .then(function(userRef?: any) { // Set userName
            return userRef.child('userName').set(userName)
        })
        .then(function() {
            self.userName = userName;
            return Promise.resolve();
        })
}

export default ChangeUserName;