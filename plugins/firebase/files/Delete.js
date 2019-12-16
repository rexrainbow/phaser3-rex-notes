var Delete = function (fileID) {
    var ownerID = this.ownerInfo.userID;
    var self = this;
    return LoadHeader.call(this, fileID) // Try load header
        .then(function (prevHeader) {
            if (!prevHeader) { // File dose not exist
                return Promise.resolve({
                    ownerID: ownerID,
                    fileID: fileID
                });
            }

            var headerDocRef, contentDocRef;
            headerDocRef = self.rootRef.doc(prevHeader.headerDocID);
            if (prevHeader.contentDocID) {
                contentDocRef = self.rootRef.doc(prevHeader.contentDocID);
            }

            var batch = self.database.batch();
            batch.delete(headerDocRef);
            if (contentDocRef) {
                batch.delete(contentDocRef);
            }
            return batch.commit();
        })
        .then(function () {
            if (self.cacheHeaders.hasOwnProperty(fileID)) {
                delete self.cacheHeaders[fileID];
            }
            if (self.cacheFileData && (self.cacheFileData.header.fileID === fileID)) {
                self.cacheFileData = undefined;
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