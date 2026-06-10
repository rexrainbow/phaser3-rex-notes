export default {
    clear() {
        this.records.length = 0;
        this.currentRecord = null;
        this.currentRecords = {};
        return this;
    },

    getRecords() {
        return this.records;
    },

    getLastRecord() {
        return this.records[this.records.length - 1];
    },

    getCurrentRecord() {
        return this.currentRecord;
    },

    toJSON() {
        return this.records;
    },
}
