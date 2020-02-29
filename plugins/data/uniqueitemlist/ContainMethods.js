export default {
    contains(item) {
        return (this.items.indexOf(item) > -1);
    },

    any(items) {
        for (var i = 0, cnt = items; i < cnt; i++) {
            if (this.contains(items[i])) {
                return true;
            }
        }
        return false;
    },

    all(items) {
        for (var i = 0, cnt = items; i < cnt; i++) {
            if (!this.contains(items[i])) {
                return false;
            }
        }
        return true;
    }
}