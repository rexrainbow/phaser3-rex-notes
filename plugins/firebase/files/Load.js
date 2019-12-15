var Load = function (fileName) {
    var ownerID = this.ownerInfo.userID;

    var self = this;
    return this.getFileQuery(undefined, fileName)
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
            self.emit('load', fileName, header, content);
            return Promise.resolve({
                ownerID: ownerID,
                fileName: fileName,
                header: header,
                content: content
            });
        })
        .catch(function () {
            self.emit('load-fail', fileName);
            return Promise.reject({
                error: error,
                ownerID: ownerID,
                fileName: fileName
            });
        });
}

export default Load;