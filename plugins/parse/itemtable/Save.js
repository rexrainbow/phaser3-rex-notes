import IsArray from '../../utils/object/IsArray.js';
import DataToItem from '../utils/DataToItem.js';
import SetOwnerAccessMode from '../utils/SetOwnerAccessMode.js';

var Save = function (data) {
    if (IsArray(data)) {
        return this.saveItems(data);
    }

    var self = this;
    return new Promise(function (resolve, reject) {
        if (self.primaryKeys.length > 0) {
            getQuery.call(self, data)
                .first()
                .then(function (result) {
                    if (result) {
                        var itemID = result.id;
                        if (data instanceof self.customClass) {
                            data.set('id', itemID);
                        } else {
                            data.id = itemID;
                        }
                    }
                    saveItem.call(self, data).then(resolve).catch(reject);
                })
                .catch(reject);
        } else {
            saveItem.call(self, data).then(resolve).catch(reject);
        }
    });
}

var getQuery = function (data) {
    var query = this.createQuery().select('id');
    var isItem = (data instanceof this.customClass);
    var key, value;
    for (var i = 0, cnt = this.primaryKeys.length; i < cnt; i++) {
        key = this.primaryKeys[i];
        value = (isItem) ? data.get(key) : data[key]
        query.equalTo(key, value);
    }
    return query;
}

var saveItem = function (data) {
    var item = DataToItem(data, this.customClass);
    SetOwnerAccessMode(item, this.ownerRead, this.ownerWrite);
    return item.save();
}

export default Save;