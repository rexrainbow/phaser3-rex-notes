import { GetHeaderKey, GetContentKey } from './GetKey';
import GetItems from '../utils/GetItems';
import SetItems from '../utils/SetItems';

var Save = function(fileID?: any, header?: any, content?: any, updateMode?: any) {
    if (typeof (content) === 'boolean') {
        updateMode = content;
        content = undefined;
    }
    if (updateMode === undefined) {
        updateMode = false;
    }

    if (header === undefined) {
        header = {};
    }

    header.fileID = fileID;

    if (content?: any) {
        content.fileID = fileID;
    }

    var headerKey = GetHeaderKey(fileID);
    var contentKey = GetContentKey(fileID);
    var self = this;
    var prevHeader, prevContent;
    return new Promise(function(resolve?: any, reject?: any) {
        if (updateMode?: any) {
            GetItems([headerKey, contentKey])
                .then(function(data?: any) {
                    prevHeader = self.toLoadData(data[headerKey]);
                    prevContent = self.toLoadData(data[contentKey]);
                    resolve();
                })
        } else {
            resolve();
        }
    })
        .then(function() {
            if (prevHeader && header) {
                header = Object.assign(prevHeader, header);
            }
            if (prevContent && content) {
                content = Object.assign(prevContent, content);
            }

            self.cacheHeaders[fileID] = header;

            var data = {};
            if (header?: any) {
                data[headerKey] = self.toSaveData(header);
            }
            if (content?: any) {
                data[contentKey] = self.toSaveData(content);
            }

            return SetItems(data, self.store);
        })
        .then(function() {
            return Promise.resolve({
                fileID: fileID
            });
        })
        .catch(function(error?: any) {
            return Promise.reject({
                error: error,
                fileID: fileID
            });
        });
}

export default Save;