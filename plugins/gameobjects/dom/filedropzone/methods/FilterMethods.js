export default {
    addFilter(name, callback) {
        if (!this.filters) {
            this.filters = {};
        }
        this.filters[name] = callback;
        return this;
    },

    addFilters(fileTypeFilters) {
        if (!this.fileTypeFilters) {
            this.fileTypeFilters = {};
        }
        for (var name in fileTypeFilters) {
            this.fileTypeFilters[name] = fileTypeFilters[name];
        }
        return this;
    },
}