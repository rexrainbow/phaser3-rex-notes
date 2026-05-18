import localforage from 'localforage';

var GetItems = function(data?: any, store?: any) {
    if (store === undefined) {
        store = localforage;
    }

    if (Array.isArray(data)) {
        var keys = data;
        data = {};
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
            data[keys[i]] = null;
        }
    }

    var promises = [];
    for (let key in data) {
        promises.push(
            store.getItem(key)
                .then(function(value?: any) {
                    data[key] = value;
                })
        );
    }
    return Promise.all(promises)
        .then(function() {
            return Promise.resolve(data);
        })
}

export default GetItems;