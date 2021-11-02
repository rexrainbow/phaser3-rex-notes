import { GetHeaderKey, GetContentKey } from './GetKey.js';
import GetItems from '../utils/GetItems.js';
import { Unzip } from './Zip.js';

var Load = function (fileID) {
    var headerKey = GetHeaderKey(fileID);
    var contentKey = GetContentKey(fileID);
    var self = this;
    return GetItems([headerKey, contentKey], this.store)
        .then(function (data) {
            var header = (self.zipMode) ? Unzip(data[headerKey]) : data[headerKey];
            var content = (self.zipMode) ? Unzip(data[contentKey]) : data[contentKey];
            self.cacheHeaders[fileID] = header;
            return Promise.resolve({
                fileID: fileID,
                header: header,
                content: content
            })
        })
}

export default Load;