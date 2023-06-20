var AddChildrenMap = function (key, gameObject) {
    if (typeof (key) === 'string') {
        this.childrenMap[key] = gameObject;
    } else {
        var config = key;
        for (key in config) {
            this.childrenMap[key] = config[key];
        }
    }
    return this;
}

export default AddChildrenMap;