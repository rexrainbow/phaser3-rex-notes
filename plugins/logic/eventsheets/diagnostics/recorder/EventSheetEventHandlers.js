import {
    EVT_EVENTSHEET_OPEN,
    EVT_EVENTSHEET_CONDITION,
    EVT_EVENTSHEET_ENTER,
    EVT_EVENTSHEET_CATCH,
    EVT_EVENTSHEET_TICK,
    EVT_EVENTSHEET_STATUS,
    EVT_EVENTSHEET_CLOSE,
    EVT_EVENTSHEET_EXIT,
    EVT_EVENTSHEET_SKIP,
    EVT_EVENTSHEET_ABORT,
} from '../../eventsheetmanager/constants.js';
import {
    IDLE,
    SUCCESS,
    FAILURE,
    RUNNING,
    ABORT,
    ERROR,
} from '../../../behaviortree/constants.js';

const StatusNameMap = {
    [IDLE]: 'IDLE',
    [SUCCESS]: 'SUCCESS',
    [FAILURE]: 'FAILURE',
    [RUNNING]: 'RUNNING',
    [ABORT]: 'ABORT',
    [ERROR]: 'ERROR',
};

var GetStatusName = function (status) {
    return StatusNameMap[status] || `UNKNOWN(${status})`;
}

export default {
    onEventSheetOpen(sheetTitle, groupName, manager, eventSheet, eventSheetGroup) {
        this.addEvent(this.createEventSheetEvent(EVT_EVENTSHEET_OPEN, sheetTitle, groupName, manager, eventSheet, eventSheetGroup), manager, groupName);
    },

    onEventSheetCondition(sheetTitle, groupName, passed, manager, eventSheet, eventSheetGroup) {
        var event = this.createEventSheetEvent(EVT_EVENTSHEET_CONDITION, sheetTitle, groupName, manager, eventSheet, eventSheetGroup);
        event.conditionPassed = passed;
        this.addEvent(event, manager, groupName);
    },

    onEventSheetEnter(sheetTitle, groupName, manager, eventSheet, eventSheetGroup) {
        this.addEvent(this.createEventSheetEvent(EVT_EVENTSHEET_ENTER, sheetTitle, groupName, manager, eventSheet, eventSheetGroup), manager, groupName);
    },

    onEventSheetCatch(sheetTitle, groupName, manager, eventSheet, eventSheetGroup) {
        this.addEvent(this.createEventSheetEvent(EVT_EVENTSHEET_CATCH, sheetTitle, groupName, manager, eventSheet, eventSheetGroup), manager, groupName);
    },

    onEventSheetTick(sheetTitle, groupName, manager, eventSheet, eventSheetGroup) {
        this.addEvent(this.createEventSheetEvent(EVT_EVENTSHEET_TICK, sheetTitle, groupName, manager, eventSheet, eventSheetGroup), manager, groupName);
    },

    onEventSheetStatus(sheetTitle, groupName, status, manager, eventSheet, eventSheetGroup) {
        var event = this.createEventSheetEvent(EVT_EVENTSHEET_STATUS, sheetTitle, groupName, manager, eventSheet, eventSheetGroup);
        event.status = status;
        event.statusName = GetStatusName(status);
        this.addEvent(event, manager, groupName);
    },

    onEventSheetClose(sheetTitle, groupName, manager, eventSheet, eventSheetGroup) {
        this.addEvent(this.createEventSheetEvent(EVT_EVENTSHEET_CLOSE, sheetTitle, groupName, manager, eventSheet, eventSheetGroup), manager, groupName);
    },

    onEventSheetExit(sheetTitle, groupName, manager, eventSheet, eventSheetGroup) {
        this.addEvent(this.createEventSheetEvent(EVT_EVENTSHEET_EXIT, sheetTitle, groupName, manager, eventSheet, eventSheetGroup), manager, groupName);
    },

    onEventSheetSkip(sheetTitle, groupName, reason, manager, eventSheet, eventSheetGroup) {
        var event = this.createEventSheetEvent(EVT_EVENTSHEET_SKIP, sheetTitle, groupName, manager, eventSheet, eventSheetGroup);
        event.reason = reason;
        this.addEvent(event, manager, groupName);
    },

    onEventSheetAbort(sheetTitle, groupName, manager, eventSheet, eventSheetGroup) {
        this.addEvent(this.createEventSheetEvent(EVT_EVENTSHEET_ABORT, sheetTitle, groupName, manager, eventSheet, eventSheetGroup), manager, groupName);
    },

}