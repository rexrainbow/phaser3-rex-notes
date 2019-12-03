var Leave = function () {
    var userID = this.userInfo.userID;
    if (!this.contains(userID)) {
        return Promise.resolve();  // Promise
    }
    var itemID = this.userID2ItemID[userID];
    var userRef = GetRef(this.database, this.rootPath, itemID);
    return userRef.remove();  // Promise
}

export default Leave;