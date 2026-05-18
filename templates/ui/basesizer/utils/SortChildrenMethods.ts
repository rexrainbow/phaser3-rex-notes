export default {
    sortChildren(callback?: any) {
        this.sizerChildren.sort(callback);
        return this;
    },

    sortChildrenByData(key?: any, descending?: any) {
        this.sizerChildren.sort(function(childA?: any, childB?: any) {
            var valueA = childA.getData(key);
            var valueB = childB.getData(key);
            if (descending?: any) {
                return valueB - valueA;
            } else {
                return valueA - valueB;
            }
        });
        return this;
    },

    sortChildrenByProperty(key?: any, descending?: any) {
        this.sizerChildren.sort(function(childA?: any, childB?: any) {
            var valueA = childA[key];
            var valueB = childB[key];
            if (descending?: any) {
                return valueB - valueA;
            } else {
                return valueA - valueB;
            }
        });
        return this;
    },
}