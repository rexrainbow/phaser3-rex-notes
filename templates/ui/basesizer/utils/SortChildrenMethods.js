export default {
    sortChildren(callback) {
        this.sizerChildren.sort(callback);
        return this;
    },

    sortChildrenByData(key, descending) {
        this.sizerChildren.sort(function (childA, childB) {
            var valueA = childA.getData(key);
            var valueB = childB.getData(key);
            if (descending) {
                return valueB - valueA;
            } else {
                return valueA - valueB;
            }
        });
        return this;
    },

    sortChildrenByProperty(key, descending) {
        this.sizerChildren.sort(function (childA, childB) {
            var valueA = childA[key];
            var valueB = childB[key];
            if (descending) {
                return valueB - valueA;
            } else {
                return valueA - valueB;
            }
        });
        return this;
    },
}