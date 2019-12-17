import DocToHeader from './DocToHeader.js';

var Load = function (fileID) {
    var ownerID = this.ownerInfo.userID;

    var self = this;
    return this.getFileQuery(ownerID, fileID)
        .get()
        .then(function (querySnapshot) {
            var header, content;
            querySnapshot.forEach(function (doc) {
                switch (docData.type) {
                    case 'header':
                        header = DocToHeader(doc);
                        break;
                    case 'content':
                        content = doc.data();
                        break;
                }
            });
            return Promise.resolve({
                ownerID: ownerID,
                fileID: fileID,
                header: header,
                content: content
            });
        })
        .catch(function () {
            return Promise.reject({
                error: error,
                ownerID: ownerID,
                fileID: fileID
            });
        });
}

export default Load;