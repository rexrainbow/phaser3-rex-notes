var Delete = function (fileID) {
    var ownerID = this.ownerInfo.userID;
    var self = this;
    return this.getFileQuery(ownerID, fileID)
        .get()
        .then(function (querySnapshot) {
            var batch = self.database.batch();
            var headerDocRef, contentDocRef;
            querySnapshot.forEach(function (doc) {
                var docRef = self.rootRef.doc(doc.id);
                var docData = doc.data();
                switch (docData.type) {
                    case 'header':
                        headerDocRef = docRef;
                        break;
                    case 'content':
                        contentDocRef = docRef;
                        break;
                }
            });

            if (headerDocRef) {
                batch.delete(headerDocRef);
            }
            if (contentDocRef) {
                batch.delete(contentDocRef);
            }
            return batch.commit();
        })
        .then(function () {
            if (self.lastHeaders.hasOwnProperty(fileID)) {
                delete self.lastHeaders[fileID];
            }
            if (self.lastFileData && (self.lastFileData.header.fileID === fileID)) {
                self.lastFileData = undefined;
            }

            self.emit('delete', fileID);
            return Promise.resolve({
                ownerID: ownerID,
                fileID: fileID
            });
        })
        .catch(function (error) {
            self.emit('delete-fail', fileID);
            return Promise.reject({
                error: error,
                ownerID: ownerID,
                fileID: fileID
            });
        });
}

export default Delete;