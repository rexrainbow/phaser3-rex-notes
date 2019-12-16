import DocToHeader from './DocToHeader.js';
import Clear from '../../utils/object/Clear.js';

var LoadHeaders = function () {
    var ownerID = this.ownerInfo.userID;
    var self = this;
    return this.getFileQuery(ownerID, undefined, 'header')
        .get()
        .then(function (querySnapshot) {
            var header;
            Clear(self.cacheHeaders);
            querySnapshot.forEach(function (doc) {
                header = DocToHeader(doc);
                self.cacheHeaders[header.fileID] = header;
            });
            self.emit('loadheaders', self.cacheHeaders);
            return Promise.resolve({
                ownerID: ownerID,
                headers: self.cacheHeaders
            });
        })
        .catch(function () {
            self.emit('loadheaders-fail');
            return Promise.reject({
                error: error,
                ownerID: ownerID
            });
        });
}

export default LoadHeaders;