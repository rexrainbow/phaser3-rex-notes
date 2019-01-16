import IsEmpty from '../../utils/object/IsEmpty.js';

var Save = function (data) {
    var self = this;
    var onSave = function (item) {
        self.emit('save', item);
    }
    var onSaveFail = function (error) {
        self.emit('savefail', error);
    }

    var query = getQuery.call(this, data);
    if (query) {
        query
            .first()
            .then(function (result) {
                if (result) {
                    data.id = result.id;
                }
                saveItem.call(self, data, onSave, onSaveFail);
            })
            .catch(onSaveFail);
    } else {
        saveItem.call(self, data, onSave, onSaveFail);
    }
}

var getQuery = function (data) {
    var query;
    if (IsEmpty(this.primaryKeys)) {
        return query;
    }

    for (var key in data) {
        if (this.primaryKeys.hasOwnProperty(key)) {
            if (query === undefined) {
                query = this.createQuery().select('id');
            }
            query.equalTo(key, data[key]);           
        }
    }
    return query;
}

var saveItem = function (data, onSuccess, onFail) {
    var item = this.createItem();
    for (var key in data) {
        item.set(key, data[key]);
    }
    item
        .save()
        .then(onSuccess)
        .catch(onFail);
}

export default Save;