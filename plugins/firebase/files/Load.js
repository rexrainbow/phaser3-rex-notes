var Load = function (fileName) {
    var ownerID = this.ownerInfo.userID;

    var self = this;
    return this.getFileQuery(ownerID, fileName)
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
            self.lastFileData = ConstructData(header, content);
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

var ConstructData = function (header, content) {
    return {
        header: header,
        content: content
    }
};

export default Load;