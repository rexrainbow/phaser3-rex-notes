var LoadHeaders = function () {
    var ownerID = this.ownerInfo.userID;

    var self = this;
    return this.getFileQuery(undefined, undefined, 'header')
        .get()
        .then(function (querySnapshot) {
            var headers = [];
            querySnapshot.forEach(function (doc) {
                headers.push(doc.data());
            });
            self.emit('loadheaders', headers);
            return Promise.resolve({
                ownerID: ownerID,
                headers: headers
            });
        })
        .catch(function () {
            self.emit('loadheaders-fail');
            return Promise.reject({
                error: error,
                ownerID: ownerID
            });
        });
}

export default LoadHeaders;