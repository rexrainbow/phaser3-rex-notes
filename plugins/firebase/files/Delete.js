var Delete = function (fileName) {
    var ownerID = this.ownerInfo.userID;
    var self = this;
    return this.getFileQuery(ownerID, fileName)
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
            if (self.lastHeaders.hasOwnProperty(fileName)) {
                delete self.lastHeaders[fileName];
            }
            if (self.lastFileData && (self.lastFileData.header.fileName === fileName)) {
                self.lastFileData = undefined;
            }

            self.emit('delete', fileName);
            return Promise.resolve({
                ownerID: ownerID,
                fileName: fileName
            });
        })
        .catch(function (error) {
            self.emit('delete-fail', fileName);
            return Promise.reject({
                error: error,
                ownerID: ownerID,
                fileName: fileName
            });
        });
}

export default Delete;