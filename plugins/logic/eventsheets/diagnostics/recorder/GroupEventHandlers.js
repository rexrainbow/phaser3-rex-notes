import {
    EVT_GROUP_START,
    EVT_GROUP_CONTINUE,
    EVT_GROUP_COMPLETE,
    EVT_GROUP_STOP,
} from '../../eventsheetmanager/constants.js';

export default {
    onGroupStart(groupName, manager) {
        var record = this.startRecord(manager, groupName);
        this.addEvent(this.createBaseEvent(EVT_GROUP_START, manager, groupName), manager, groupName);
        return record;
    },

    onGroupContinue(groupName, manager) {
        this.addEvent(this.createBaseEvent(EVT_GROUP_CONTINUE, manager, groupName), manager, groupName);
    },

    onGroupComplete(groupName, manager) {
        var recordKey = this.getRecordKey(manager, groupName);
        this.addEvent(this.createBaseEvent(EVT_GROUP_COMPLETE, manager, groupName), manager, groupName);
        this.finalizeRecord(recordKey, 'COMPLETE');
    },

    onGroupStop(groupName, manager) {
        var recordKey = this.getRecordKey(manager, groupName);
        this.addEvent(this.createBaseEvent(EVT_GROUP_STOP, manager, groupName), manager, groupName);
        this.scheduleStopRecord(recordKey);
    },

}