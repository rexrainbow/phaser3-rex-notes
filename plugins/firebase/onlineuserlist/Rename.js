var Rename = function (userName) {
    this.userName = userName;
    // TODO: Query userID then rename
    var query = this.getRootRef().orderByChild('userID').equalTo(this.userID);
    return query.once('value')
        .then(function (snapshot) {
            console.log(snapshot.val());
            debugger;
        })
    // .set(userName);
}

export default Rename;