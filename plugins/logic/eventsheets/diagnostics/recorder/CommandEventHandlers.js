import SerializeValue from './SerializeValue.js';
import {
    EVT_COMMAND_START,
    EVT_COMMAND_END,
    EVT_COMMAND_PAUSE,
    EVT_COMMAND_RESUME,
    EVT_COMMAND_ABORT,
} from '../../eventsheetmanager/constants.js';

export default {
    onCommandStart(commandName, parameters, sheetTitle, groupName, manager, eventSheet, taskNode, eventSheetGroup) {
        this.addEvent(this.createCommandEvent(EVT_COMMAND_START, commandName, parameters, sheetTitle, groupName, manager, eventSheet, taskNode, eventSheetGroup), manager, groupName);
    },

    onCommandEnd(commandName, parameters, success, result, sheetTitle, groupName, manager, eventSheet, taskNode, eventSheetGroup) {
        var event = this.createCommandEvent(EVT_COMMAND_END, commandName, parameters, sheetTitle, groupName, manager, eventSheet, taskNode, eventSheetGroup);
        event.success = success;
        if (this.includeResult) {
            event.result = SerializeValue(result);
        }
        this.addEvent(event, manager, groupName);
    },

    onCommandPause(commandName, parameters, sheetTitle, groupName, manager, eventSheet, taskNode, eventSheetGroup) {
        this.addEvent(this.createCommandEvent(EVT_COMMAND_PAUSE, commandName, parameters, sheetTitle, groupName, manager, eventSheet, taskNode, eventSheetGroup), manager, groupName);
    },

    onCommandResume(commandName, parameters, sheetTitle, groupName, manager, eventSheet, taskNode, eventSheetGroup) {
        this.addEvent(this.createCommandEvent(EVT_COMMAND_RESUME, commandName, parameters, sheetTitle, groupName, manager, eventSheet, taskNode, eventSheetGroup), manager, groupName);
    },

    onCommandAbort(commandName, parameters, sheetTitle, groupName, manager, eventSheet, taskNode, eventSheetGroup) {
        this.addEvent(this.createCommandEvent(EVT_COMMAND_ABORT, commandName, parameters, sheetTitle, groupName, manager, eventSheet, taskNode, eventSheetGroup), manager, groupName);
    },

}