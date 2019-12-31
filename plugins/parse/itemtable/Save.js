import IsArray from '../../utils/object/IsArray.js';
import DataToItem from '../utils/DataToItem.js';
import SetOwnerAccessMode from '../utils/SetOwnerAccessMode.js';

var Save = function (data) {
    if (IsArray(data)) {
        return this.saveItems(data);
    }

    if (this.primaryKeys.length > 0) {
        var self = this;
        return GetQuery.call(this, data).first()
            .then(function (item) {
                if (item) {
                    var itemID = item.id;
                    if (data instanceof self.customClass) {
                        data.set('id', itemID);
                    } else {
                        data.id = itemID;
                    }                    
                }
                return SaveItem.call(self, data);
            })
    } else {
        return SaveItem.call(this, data);
    }
}

var GetQuery = function (data) {
    var query = this.baseQuery.select('id');
    var isItem = (data instanceof this.customClass);
    var key, value;
    for (var i = 0, cnt = this.primaryKeys.length; i < cnt; i++) {
        key = this.primaryKeys[i];
        value = (isItem) ? data.get(key) : data[key]
        query.equalTo(key, value);
    }
    return query;
}

var SaveItem = function (data) {
    var item = DataToItem(data, this.customClass);
    SetOwnerAccessMode(item, this.ownerRead, this.ownerWrite);
    return item.save();
}

export default Save;