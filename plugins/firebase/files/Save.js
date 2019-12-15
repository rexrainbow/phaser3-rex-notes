var Save = function (fileID, header, content, updateMode) {
    if (typeof (content) === 'boolean') {
        updateMode = content;
        content = undefined;
    }
    if (updateMode === undefined) {
        updateMode = false;
    }

    var ownerID = this.ownerInfo.userID;
    if (header !== undefined) {
        header.ownerID = ownerID;
        header.fileID = fileID;
        header.type = 'header';
    }
    if (content !== undefined) {
        content.ownerID = ownerID;
        content.fileID = fileID;
        content.type = 'content';
    }

    var self = this;
    return this.getFileQuery(ownerID, fileID)
        .get()
        .then(function (querySnapshot) {
            var batch = self.database.batch();
            var writeCommand = (updateMode) ? 'update' : 'set';
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

            if (header) {
                if (headerDocRef === undefined) {
                    headerDocRef = self.rootRef.doc();
                }
                batch[writeCommand](headerDocRef, header);
            }
            if (content) {
                if (contentDocRef === undefined) {
                    contentDocRef = self.rootRef.doc();
                }
                batch[writeCommand](contentDocRef, content);
            }
            return batch.commit();
        })
        .then(function () {
            self.emit('save', fileID);
            return Promise.resolve({
                ownerID: ownerID,
                fileID: fileID
            });
        })
        .catch(function (error) {
            self.emit('save-fail', fileID);
            return Promise.reject({
                error: error,
                ownerID: ownerID,
                fileID: fileID
            });
        });
}

export default Save;