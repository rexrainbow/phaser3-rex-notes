export default {
    hasEvent(eventName) {
        return (this.events.indexOf(eventName) !== -1);
    },

    addEvent(event, manager, groupName) {
        if (!this.hasEvent(event.type)) {
            return;
        }

        if (this.includeTime) {
            event.time = Date.now();
        }

        var record;
        if ((manager !== undefined) && (groupName !== undefined)) {
            record = this.currentRecords[this.getRecordKey(manager, groupName)];
        }
        if (!record) {
            record = this.currentRecord;
        }

        if (this.filter && !this.filter(event, record, this)) {
            return;
        }

        if (record) {
            event.roundID = record.roundID;
            record.events.push(event);
        }

        if (this.onEvent) {
            this.onEvent(event, record, this);
        }
    },
}
