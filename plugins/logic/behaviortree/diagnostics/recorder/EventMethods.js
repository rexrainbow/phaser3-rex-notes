export default {
    hasEvent(eventName) {
        return (this.events.indexOf(eventName) !== -1);
    },

    addEvent(event, tick) {
        var currentRecord = this.currentRecords[tick.tree.id] || this.currentRecord;

        if (this.includeTime) {
            event.time = tick.currentTime;
        }

        if (this.filter && !this.filter(event, currentRecord, this)) {
            return;
        }

        if (currentRecord) {
            currentRecord.events.push(event);
        }

        if (this.onEvent) {
            this.onEvent(event, currentRecord, this);
        }
    },
}
