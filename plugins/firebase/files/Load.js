var Load = function (fileID) {
    var ownerID = this.ownerInfo.userID;

    var self = this;
    return this.getFileQuery(ownerID, fileID)
        .get()
        .then(function (querySnapshot) {
            var header, content;
            querySnapshot.forEach(function (doc) {
                var docData = doc.data();
                switch (docData.type) {
                    case 'header':
                        header = docData;
                        break;
                    case 'content':
                        content = docData;
                        break;
                }
            });
            self.emit('load', fileID, header, content);
            return Promise.resolve({
                ownerID: ownerID,
                fileID: fileID,
                header: header,
                content: content
            });
        })
        .catch(function () {
            self.emit('load-fail', fileID);
            return Promise.reject({
                error: error,
                ownerID: ownerID,
                fileID: fileID
            });
        });
}

export default Load;