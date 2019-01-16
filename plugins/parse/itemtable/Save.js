var Save = function (data) {
    var self = this;
    return new Promise(function (resolve, reject) {
        var onSave = function (item) {
            self.emit('save', item);
            resolve(item);
        }
        var onSaveFail = function (error) {
            self.emit('savefail', error);
            reject(error);
        }

        var query = getQuery.call(self, data);
        if (query) {
            query
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
                    saveItem.call(self, data).then(onSave).catch(onSaveFail);
                })
                .catch(onSaveFail);
        } else {
            saveItem.call(self, data).then(onSave).catch(onSaveFail);
        }
    });
}

var getQuery = function (data) {
    var query, value;
    var isItem = (data instanceof this.customClass);
    for (var key in this.primaryKeys) {
        if (query === undefined) {
            query = this.createQuery().select('id');
        }
        value = (isItem) ? data.get(key) : data[key]
        query.equalTo(key, value);
    }
    return query;
}

var saveItem = function (data) {
    var item;
    if (data instanceof this.customClass) {
        item = data;
    } else {
        var item = this.createItem();
        for (var key in data) {
            item.set(key, data[key]);
        }
    }
    return item.save();
}

export default Save;