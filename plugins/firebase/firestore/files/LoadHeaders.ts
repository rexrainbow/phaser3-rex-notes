import DocToHeader from './DocToHeader';
import ClearDict from '../../../utils/object/Clear';

var LoadHeaders = function() {
    var userID = this.userID;
    var self = this;
    return this.getFileQuery(userID, undefined, 'header').get()
        .then(function(querySnapshot?: any) {
            var header;
            ClearDict(self.cacheHeaders);
            querySnapshot.forEach(function(doc?: any) {
                header = DocToHeader(doc);
                self.cacheHeaders[header.fileID] = header;
            });
            return Promise.resolve({
                userID: userID,
                headers: self.cacheHeaders
            });
        })
        .catch(function() {
            return Promise.reject({
                error: error,
                userID: userID
            });
        });
}

export default LoadHeaders;