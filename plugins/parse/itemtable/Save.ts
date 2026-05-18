import IsArray from '../../utils/object/IsArray';
import DataToItem from '../utils/DataToItem';
import SetOwnerAccessMode from '../utils/SetOwnerAccessMode';

var Save = function(data?: any) { // JSON data, or parse object
    if (IsArray(data)) {
        return this.saveItems(data);
    }

    var self = this;
    return new Promise(function(resolve?: any, reject?: any) {
        if (self.primaryKeys.length > 0) {
            self.loadItem(data, 'id')
                .then(resolve, reject);
        } else {
            return resolve();
        }
    })
        .then(function(item?: any) {
            item = DataToItem(data, self.customClass, item);
            SetOwnerAccessMode(item, self.ownerRead, self.ownerWrite);
            return item.save();
        })
}

export default Save;