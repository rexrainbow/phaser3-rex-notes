export default {
    setDropEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.dropEnable = enable;
        return this;
    },

    toggleDropEnable() {
        this.dropEnable = !this.dropEnable;
        return this;
    },

    addFilter(name, callback) {
        if (!this.filters) {
            this.filters = {};
        }
        this.filters[name] = callback;
        return this;
    },

    addFilters(filters) {
        if (!this.filters) {
            this.filters = {};
        }
        for (var name in filters) {
            this.filters[name] = filters[name];
        }
        return this;
    }
}