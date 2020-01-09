var DataToItem = function (data, itemClass) {
    var item;
    if (data instanceof itemClass) {
        item = data;
    } else {
        item = new itemClass();
        if (data.hasOwnProperty('id')) { // Set objectId first, to get catched item back.
            item.set('id', data.id);
        }
        for (var key in data) {
            if (key === 'id') {
                continue;
            }
            item.set(key, data[key]);
        }
    }
    return item;
}

export default DataToItem;