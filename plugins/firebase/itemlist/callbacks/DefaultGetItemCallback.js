var DefaultGetItemCallback = function (snapshot) {
    var item = snapshot.val();
    item[this.keyItemID] = snapshot.key;
    return item;
}

export default DefaultGetItemCallback;