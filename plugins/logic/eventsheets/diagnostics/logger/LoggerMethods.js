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
        return this;
    },

    stop() {
        this.recorder.stop();
        return this;
    },

    onRecorderEvent(record, roundRecord, recorder) {
        if (this.filter && !this.filter(record, roundRecord, recorder)) {
            return;
        }

        var value = this.formatter(record, roundRecord, recorder);
        if (value === undefined) {
            return;
        }

        this.write(value, record, roundRecord, recorder);
    },
}
