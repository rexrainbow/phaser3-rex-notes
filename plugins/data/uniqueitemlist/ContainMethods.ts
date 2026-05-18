export default {
    contains(item?: any) {
        return (this.items.indexOf(item) !== -1);
    },

    any(listB?: any) {
        var items = (this.isList(listB)) ? listB.items : listB;
        for (var i = 0, cnt = items; i < cnt; i++) {
            if (this.contains(items[i])) {
                return true;
            }
        }
        return false;
    },

    all(listB?: any) {
        var items = (this.isList(listB)) ? listB.items : listB;
        for (var i = 0, cnt = items; i < cnt; i++) {
            if (!this.contains(items[i])) {
                return false;
            }
        }
        return true;
    }
}