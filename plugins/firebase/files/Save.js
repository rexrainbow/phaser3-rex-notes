import LoadHeader from './LoadHeader.js';

var Save = function (fileID, header, content, updateMode) {
    if (typeof (content) === 'boolean') {
        updateMode = content;
        content = undefined;
    }
    if (updateMode === undefined) {
        updateMode = false;
    }

    var ownerID = this.ownerInfo.userID;
    if (header === undefined) {
        header = {};
    }
    header.ownerID = ownerID;
    header.fileID = fileID;
    header.type = 'header';

    if (content) {
        content.ownerID = ownerID;
        content.fileID = fileID;
        content.type = 'content';
    }
    var writeCommand = (updateMode) ? 'update' : 'set';

    var self = this;
    return LoadHeader.call(this, fileID) // Try load header
        .then(function (prevHeader) {
            var headerDocRef, contentDocRef;
            if (prevHeader) { // Overwrite file
                headerDocRef = self.rootRef.doc(prevHeader.headerDocID);
                if (content) {
                    if (prevHeader.contentDocID) {
                        contentDocRef = self.rootRef.doc(prevHeader.contentDocID);
                    } else {
                        contentDocRef = self.rootRef.doc();
                    }
                }
            } else { // Add new file
                headerDocRef = self.rootRef.doc();
                if (content) {
                    contentDocRef = self.rootRef.doc();
                }
            }
            header.headerDocID = headerDocRef.id;
            if (content) {
                header.contentDocID = contentDocRef.id;
            }


            var batch = self.database.batch();
            batch[writeCommand](headerDocRef, header);
            if (content) {
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