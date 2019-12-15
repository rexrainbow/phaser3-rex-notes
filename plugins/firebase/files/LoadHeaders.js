var LoadHeaders = function () {
    var ownerID = this.ownerInfo.userID;
    var self = this;
    return this.getFileQuery(ownerID, undefined, 'header')
        .get()
        .then(function (querySnapshot) {
            var headers = [];
            querySnapshot.forEach(function (doc) {
                headers.push(doc.data());
            });
            self.lastHeaders = ConstructData(headers);
            self.emit('loadheaders', self.lastHeaders);
            return Promise.resolve({
                ownerID: ownerID,
                headers: self.lastHeaders
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

var ConstructData = function (arr) {
    var dict = {};
    var header;
    for (var i = 0, cnt = arr.length; i < cnt; i++) {
        header = arr[i];
        dict[header.fileName] = header;
    }
    return dict;
}

export default LoadHeaders;