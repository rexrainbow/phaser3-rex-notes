var Save = function (fileName, header, content, updateMode) {
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
        header.fileName = fileName;
        header.type = 'header';
    }
    if (content !== undefined) {
        content.ownerID = ownerID;
        content.fileName = fileName;
        content.type = 'content';
    }

    var self = this;
    return this.getFileQuery(undefined, fileName)
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
            self.emit('save', fileName);
            return Promise.resolve({
                ownerID: ownerID,
                fileName: fileName
            });
        })
        .catch(function (error) {
            self.emit('save-fail', fileName);
            return Promise.reject({
                error: error,
                ownerID: ownerID,
                fileName: fileName
            });
        });
}

export default Save;