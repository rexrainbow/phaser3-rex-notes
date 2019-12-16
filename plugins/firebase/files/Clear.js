var Clear = function () {
    var ownerID = this.ownerInfo.userID;
    var self = this;
    return this.getFileQuery(ownerID, undefined, 'header')
        .get()
        .then(function (querySnapshot) {
            var batch = self.database.batch();
            var header;
            querySnapshot.forEach(function (doc) {
                header = DocToHeader(doc);
                batch.delete(self.rootRef.doc(header.headerDocID));
                if (header.contentDocID) {
                    batch.delete(self.rootRef.doc(header.contentDocID));
                }
            });
            return batch.commit();
        })
        .then(function () {
            self.clearCache();
            self.emit('deleteall', fileID);
            return Promise.resolve({
                ownerID: ownerID
            });
        })
        .catch(function (error) {
            self.emit('deleteall-fail', fileID);
            return Promise.reject({
                error: error,
                ownerID: ownerID
            });
        });
}

export default Clear;