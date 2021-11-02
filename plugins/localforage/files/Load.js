import { GetHeaderKey, GetContentKey } from './GetKey.js';
import GetItems from '../utils/GetItems.js';

var Load = function (fileID) {
    var headerKey = GetHeaderKey(fileID);
    var contentKey = GetContentKey(fileID);
    var self = this;
    return GetItems([headerKey, contentKey], this.store)
        .then(function (data) {
            self.cacheHeaders[fileID] = data[headerKey];
            return Promise.resolve({
                fileID: fileID,
                header: data[headerKey],
                content: data[contentKey]
            })
        })
}

export default Load;