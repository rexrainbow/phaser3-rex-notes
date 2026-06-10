export default {
    setManager(manager) {
        this.recorder.setManager(manager);
        this.manager = this.recorder.manager;
        return this;
    },

    setManagers(managers) {
        this.recorder.setManagers(managers);
        this.manager = this.recorder.manager;
        return this;
    },

    start() {
        this.recorder.start();
        this.manager = this.recorder.manager;
        return this;
    },

    stop() {
        this.recorder.stop();
        return this;
    },

    clear() {
        this.recorder.clear();
        return this;
    },

    getRecords() {
        return this.recorder.getRecords();
    },

    getLastRecord() {
        return this.recorder.getLastRecord();
    },

    getCurrentRecord(groupName, manager) {
        return this.recorder.getCurrentRecord(groupName, manager);
    },

    toJSON() {
        return this.recorder.toJSON();
    },
}
