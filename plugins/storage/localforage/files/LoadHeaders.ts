import { IsHeaderKey, GetFileID } from './GetKey';
import GetItems from '../utils/GetItems';
import Clear from '../../../utils/object/Clear';

var LoadHeaders = function() {
    var self = this;
    return this.store.keys()
        .then(function(keys?: any) {
            return GetItems(keys.filter(IsHeaderKey), self.store);
        })
        .then(function(data?: any) {
            Clear(self.cacheHeaders);
            for (var key in data) {
                self.cacheHeaders[GetFileID(key)] = self.toLoadData(data[key]);
            }

            return Promise.resolve({
                headers: self.cacheHeaders
            });
        })
        .catch(function() {
            return Promise.reject({
                error: error,
            });
        });
}

export default LoadHeaders;