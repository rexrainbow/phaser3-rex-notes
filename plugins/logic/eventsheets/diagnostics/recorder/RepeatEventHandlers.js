import { EVT_REPEAT_ITERATION } from '../../eventsheetmanager/constants.js';
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
    onRepeatIteration(iterationIndex, maxLoop, status, sheetTitle, groupName, manager, eventSheet, repeatNode, eventSheetGroup) {
        var event = this.createEventSheetEvent(EVT_REPEAT_ITERATION, sheetTitle, groupName, manager, eventSheet, eventSheetGroup);

        event.iterationIndex = iterationIndex;
        event.maxLoop = maxLoop;
        event.status = status;
        event.statusName = GetStatusName(status);

        if (repeatNode) {
            if (repeatNode.id !== undefined) {
                event.nodeID = repeatNode.id;
            }

            event.nodeName = repeatNode.name;
            event.nodeTitle = repeatNode.title;
        }

        if (this.includeReferences) {
            event.node = repeatNode;
        }

        this.addEvent(event, manager, groupName);
    },
}
