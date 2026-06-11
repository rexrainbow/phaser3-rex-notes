import {
    EVT_GROUP_START,
    EVT_GROUP_CONTINUE,
    EVT_GROUP_COMPLETE,
    EVT_GROUP_STOP,
    EVT_EVENTSHEET_ADD,
    EVT_EVENTSHEET_REMOVE,
    EVT_EVENTSHEET_REMOVE_ALL,
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
    EVT_LABEL_ENTER,
    EVT_LABEL_EXIT,
    EVT_COMMAND_START,
    EVT_COMMAND_END,
    EVT_COMMAND_PAUSE,
    EVT_COMMAND_RESUME,
    EVT_COMMAND_ABORT,
    EVT_CONDITION_EVAL,
    EVT_PAUSE_CLICK,
    EVT_PAUSE_KEY,
    EVT_PAUSE_INPUT,
    EVT_RESUME_INPUT,
} from '../../../eventsheetmanager/constants.js';
import FormatValue from './FormatValue.js';

var GetSheetLabel = function (record) {
    return (record.sheetTitle) ? ` sheet="${record.sheetTitle}"` : '';
}

var GetCommandLabel = function (record) {
    var text = ` command="${record.commandName}"`;
    if (record.parameters !== undefined) {
        text += ` ${FormatValue(record.parameters)}`;
    }
    return text;
}

var FormatExpression = function (expression) {
    if (expression && (typeof (expression) === 'object')) {
        var text = expression.name || JSON.stringify(expression);
        if (expression.parameters) {
            text += ` ${FormatValue(expression.parameters)}`;
        }
        return text;
    }

    return `"${expression}"`;
}

var CompactFormatter = function (record) {
    var groupName = (record.groupName !== undefined) ? record.groupName : '-';
    var prefix = `[ES ${groupName}]`;

    switch (record.type) {
        case EVT_GROUP_START:
            return `${prefix} start`;

        case EVT_GROUP_CONTINUE:
            return `${prefix} continue`;

        case EVT_GROUP_COMPLETE:
            return `${prefix} complete`;

        case EVT_GROUP_STOP:
            return `${prefix} stop`;

        case EVT_EVENTSHEET_ADD:
            return `${prefix}${GetSheetLabel(record)} add`;

        case EVT_EVENTSHEET_REMOVE:
            return `${prefix}${GetSheetLabel(record)} remove`;

        case EVT_EVENTSHEET_REMOVE_ALL:
            return `${prefix} removeall sheets=${FormatValue(record.sheetTitles)}`;

        case EVT_EVENTSHEET_OPEN:
            return `${prefix}${GetSheetLabel(record)} open`;

        case EVT_EVENTSHEET_CONDITION:
            return `${prefix}${GetSheetLabel(record)} condition=${record.conditionPassed}`;

        case EVT_EVENTSHEET_ENTER:
            return `${prefix}${GetSheetLabel(record)} enter`;

        case EVT_EVENTSHEET_CATCH:
            return `${prefix}${GetSheetLabel(record)} catch`;

        case EVT_EVENTSHEET_TICK:
            return `${prefix}${GetSheetLabel(record)} tick`;

        case EVT_EVENTSHEET_STATUS:
            return `${prefix}${GetSheetLabel(record)} status=${record.statusName}`;

        case EVT_EVENTSHEET_CLOSE:
            return `${prefix}${GetSheetLabel(record)} close`;

        case EVT_EVENTSHEET_EXIT:
            return `${prefix}${GetSheetLabel(record)} exit`;

        case EVT_EVENTSHEET_SKIP:
            return `${prefix}${GetSheetLabel(record)} skip reason=${record.reason}`;

        case EVT_EVENTSHEET_ABORT:
            return `${prefix}${GetSheetLabel(record)} abort`;

        case EVT_LABEL_ENTER:
            return `${prefix}${GetSheetLabel(record)} label="${record.labelTitle}" enter`;

        case EVT_LABEL_EXIT:
            return `${prefix}${GetSheetLabel(record)} label="${record.labelTitle}" exit`;

        case EVT_COMMAND_START:
            return `${prefix}${GetSheetLabel(record)}${GetCommandLabel(record)} start`;

        case EVT_COMMAND_END:
            return `${prefix}${GetSheetLabel(record)}${GetCommandLabel(record)} end success=${record.success}`;

        case EVT_COMMAND_PAUSE:
            return `${prefix}${GetSheetLabel(record)}${GetCommandLabel(record)} pause`;

        case EVT_COMMAND_RESUME:
            return `${prefix}${GetSheetLabel(record)}${GetCommandLabel(record)} resume`;

        case EVT_COMMAND_ABORT:
            return `${prefix}${GetSheetLabel(record)}${GetCommandLabel(record)} abort`;

        case EVT_CONDITION_EVAL:
            return `${prefix}${GetSheetLabel(record)} condition.${record.conditionType} ${FormatExpression(record.expression)} => ${record.result}`;

        case EVT_PAUSE_CLICK:
            return '[ES -] pause.click';

        case EVT_PAUSE_KEY:
            return `[ES -] pause.key key="${record.key}"`;

        case EVT_PAUSE_INPUT:
            return '[ES -] pause.input';

        case EVT_RESUME_INPUT:
            return '[ES -] resume.input';

        default:
            return `${prefix} ${record.type}`;
    }
}

export default CompactFormatter;
