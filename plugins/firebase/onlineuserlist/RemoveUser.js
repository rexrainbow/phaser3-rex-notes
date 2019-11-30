var RemoveUser = function(userID) {
    if (!this.contains(userID)) {
        return this;
    }
    var itemID = this.userID2ItemID[userID];
    var userRef = GetRef(this.database, this.rootPath, itemID);
    userRef.remove();
    return this;
}

export default RemoveUser;