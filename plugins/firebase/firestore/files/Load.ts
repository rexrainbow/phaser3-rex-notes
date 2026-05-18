import DocToHeader from './DocToHeader';

var Load = function(fileID?: any) {
    var userID = this.userID;

    var self = this;
    return this.getFileQuery(userID, fileID).get()
        .then(function(querySnapshot?: any) {
            var header, content;
            querySnapshot.forEach(function(doc?: any) {
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
                userID: userID,
                fileID: fileID,
                header: header,
                content: content
            });
        })
        .catch(function() {
            return Promise.reject({
                error: error,
                userID: userID,
                fileID: fileID
            });
        });
}

export default Load;