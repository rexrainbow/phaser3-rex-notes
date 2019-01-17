var Save = function (data) {
    var self = this;
    return new Promise(function (resolve, reject) {
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
                    saveItem.call(self, data).then(resolve).catch(reject);
                })
                .catch(reject);
        } else {
            saveItem.call(self, data).then(resolve).catch(reject);
        }
    });
}

var getQuery = function (data) {
    var query, key, value;
    var isItem = (data instanceof this.customClass);
    for (var i = 0, cnt = this.primaryKeys.length; i < cnt; i++) {
        key = this.primaryKeys[i];
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