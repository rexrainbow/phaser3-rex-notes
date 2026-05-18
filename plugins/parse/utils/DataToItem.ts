var DataToItem = function(data?: any, itemClass?: any, item?: any) {
    if (!item) {
        item = new itemClass();
    }
    item.set(data);
    return item;
}

export default DataToItem;