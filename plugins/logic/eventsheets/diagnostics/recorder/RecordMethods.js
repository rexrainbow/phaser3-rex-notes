import GetManagerID from './GetManagerID.js';

export default {
    clear() {
        this.records.length = 0;
        this.currentRecord = null;
        this.currentRecords = {};
        this.roundID = 0;
        this._stopTimers = {};
        return this;
    },

    getRecords() {
        return this.records;
    },

    getLastRecord() {
        return this.records[this.records.length - 1];
    },

    getCurrentRecord(groupName, manager) {
        if (groupName !== undefined) {
            return this.currentRecords[this.getRecordKey(manager || this.manager, groupName)];
        }

        return this.currentRecord;
    },

    toJSON() {
        return this.records;
    },

    getRecordKey(manager, groupName) {
        return `${GetManagerID(manager)}:${groupName}`;
    },

    createRecord(manager, groupName) {
        this.roundID++;

        var record = {
            type: 'eventsheet.round',
            managerID: GetManagerID(manager),
            groupName: groupName,
            roundID: this.roundID,
            events: [],
        };

        if (this.includeTime) {
            record.startTime = Date.now();
        }

        return record;
    },

    startRecord(manager, groupName) {
        var recordKey = this.getRecordKey(manager, groupName);
        var previousRecord = this.currentRecords[recordKey];
        if (previousRecord) {
            previousRecord.statusName = 'INTERRUPTED';
            this.finalizeRecord(recordKey);
        }

        var record = this.createRecord(manager, groupName);
        this.currentRecords[recordKey] = record;
        this.currentRecord = record;
        return record;
    },

    finalizeRecord(recordKey, statusName) {
        var record = this.currentRecords[recordKey];
        if (!record) {
            return;
        }

        if (statusName !== undefined) {
            record.statusName = statusName;
        }

        if (this.includeTime) {
            record.endTime = Date.now();
        }

        if (this.maxRecords > 0) {
            this.records.push(record);
            if (this.records.length > this.maxRecords) {
                this.records.shift();
            }
        }

        if (this.onRecord) {
            this.onRecord(record, this);
        }

        delete this.currentRecords[recordKey];
        this.currentRecord = null;
        for (var key in this.currentRecords) {
            this.currentRecord = this.currentRecords[key];
            break;
        }
    },

    scheduleStopRecord(recordKey) {
        var self = this;
        this._stopTimers[recordKey] = setTimeout(function () {
            delete self._stopTimers[recordKey];
            self.finalizeRecord(recordKey, 'STOPPED');
        }, 0);
    },
}
