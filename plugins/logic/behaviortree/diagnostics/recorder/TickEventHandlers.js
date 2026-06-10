import GetStatusName from './GetStatusName.js';
import {
    EVT_TICK_START,
    EVT_TICK_END,
} from '../../constants.js';

export default {
    onTickStart(tick) {
        this.tickID++;

        var record = {
            type: 'bt.tick',
            treeID: tick.tree.id,
            tickID: this.tickID,
            events: [],
        };

        if (this.includeTime) {
            record.startTime = tick.currentTime;
        }

        this.currentRecord = record;
        this.currentRecords[tick.tree.id] = record;

        if (this.hasEvent(EVT_TICK_START)) {
            this.addEvent({
                type: EVT_TICK_START,
                treeID: tick.tree.id,
                tickID: this.tickID,
            }, tick);
        }
    },

    onTickEnd(status, tick) {
        var record = this.currentRecords[tick.tree.id];
        if (!record) {
            return;
        }

        record.status = status;
        record.statusName = GetStatusName(status);
        record.nodeCount = tick._nodeCount;

        if (this.includeOpenNodes) {
            record.openNodeIDs = tick._openNodes.map(function (node) {
                return node.id;
            });
        }

        if (this.includeTime) {
            record.endTime = tick.currentTime;
        }

        if (this.hasEvent(EVT_TICK_END)) {
            this.addEvent({
                type: EVT_TICK_END,
                treeID: tick.tree.id,
                tickID: this.tickID,
                status: status,
                statusName: record.statusName,
                nodeCount: record.nodeCount,
                openNodeIDs: record.openNodeIDs,
            }, tick);
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

        delete this.currentRecords[tick.tree.id];
        this.currentRecord = null;
        for (var treeID in this.currentRecords) {
            this.currentRecord = this.currentRecords[treeID];
            break;
        }
    },
}
