var RemoveUser = function (userID) {
    if (!this.contains(userID)) {
        return Promise.resolve();  // Promise
    }
    var itemID = this.userID2ItemID[userID];
    var userRef = GetRef(this.database, this.rootPath, itemID);
    userRef.remove();
    return userRef.remove();  // Promise
}

export default RemoveUser;