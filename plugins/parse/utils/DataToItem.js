var DataToItem = function (data, itemClass) {
    var item;
    if (data instanceof itemClass) {
        item = data;
    } else {
        item = new itemClass();
        for (var key in data) {
            item.set(key, data[key]);
        }
    }    
    return item;
}

export default DataToItem;