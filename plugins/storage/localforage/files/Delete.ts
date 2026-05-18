import { GetHeaderKey, GetContentKey } from './GetKey';
import RemoveItems from '../utils/RemoveItems';

var Delete = function(fileID?: any) {
    var headerKey = GetHeaderKey(fileID);
    var contentKey = GetContentKey(fileID);
    return RemoveItems([headerKey, contentKey]);
}

export default Delete;