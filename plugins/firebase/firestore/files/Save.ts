import LoadHeader from './LoadHeader';

var Save = function(fileID?: any, header?: any, content?: any, updateMode?: any) {
    if (typeof (content) === 'boolean') {
        updateMode = content;
        content = undefined;
    }
    if (updateMode === undefined) {
        updateMode = false;
    }

    var userID = this.userID;
    if (header === undefined) {
        header = {};
    }
    header.userID = userID;
    header.fileID = fileID;
    header.type = 'header';

    if (content?: any) {
        content.userID = userID;
        content.fileID = fileID;
        content.type = 'content';
    }
    var writeCommand = (updateMode) ? 'update' : 'set';

    var self = this;
    return LoadHeader.call(this, fileID) // Try load header
        .then(function(prevHeader?: any) {
            var headerDocRef, contentDocRef;
            if (prevHeader?: any) { // Overwrite file
                headerDocRef = self.rootRef.doc(prevHeader.headerDocID);
                if (content?: any) {
                    if (prevHeader.contentDocID) {
                        contentDocRef = self.rootRef.doc(prevHeader.contentDocID);
                    } else {
                        contentDocRef = self.rootRef.doc();
                    }
                }
            } else { // Add new file
                headerDocRef = self.rootRef.doc();
                if (content?: any) {
                    contentDocRef = self.rootRef.doc();
                }
            }

            // Don't save headerDocID to server
            if (header.hasOwnProperty('headerDocID')) {
                delete header.headerDocID;
            }
            // Save contentDocID
            if (contentDocRef?: any) {
                header.contentDocID = contentDocRef.id;
            }


            var batch = self.database.batch();
            batch[writeCommand](headerDocRef, header);
            if (content?: any) {
                batch[writeCommand](contentDocRef, content);
            }
            return batch.commit();
        })
        .then(function() {
            return Promise.resolve({
                userID: userID,
                fileID: fileID
            });
        })
        .catch(function(error?: any) {
            return Promise.reject({
                error: error,
                userID: userID,
                fileID: fileID
            });
        });
}

export default Save;