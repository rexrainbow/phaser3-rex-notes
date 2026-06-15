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
    EVT_EVENTSHEET_ROUND_BREAK,
    EVT_LABEL_ENTER,
    EVT_LABEL_EXIT,
    EVT_COMMAND_START,
    EVT_COMMAND_END,
    EVT_COMMAND_PAUSE,
    EVT_COMMAND_RESUME,
    EVT_COMMAND_ABORT,
    EVT_CONDITION_EVAL,
    EVT_REPEAT_ITERATION,
    EVT_PAUSE_CLICK,
    EVT_PAUSE_KEY,
    EVT_PAUSE_INPUT,
    EVT_RESUME_INPUT,
} from '../../../eventsheetmanager/constants.js';
import FormatValue from './FormatValue.js';

const Colors = {
    group: '#5DADE2',
    sheet: '#48C9B0',
    condition: '#BB8FCE',
    command: '#58D68D',
    pause: '#F5B041',
    flow: '#F4D03F',
    warning: '#E67E22',
    error: '#EC7063',
    muted: '#AEB6BF',
    text: '#EAECEE',
};

var Color = function (color, text) {
    return `[color=${color}]${text}[/color]`;
}

var Bold = function (text) {
    return `[b]${text}[/b]`;
}

var GetPrefix = function (record) {
    var groupName = (record.groupName !== undefined) ? record.groupName : '-';
    return `${Bold(Color(Colors.group, `ES ${groupName}`))}`;
}

var GetSheetLabel = function (record) {
    return (record.sheetTitle) ? ` sheet="${Color(Colors.sheet, record.sheetTitle)}"` : '';
}

var GetCommandLabel = function (record) {
    var text = ` command="${Color(Colors.command, record.commandName)}"`;
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

var FormatReturnExpression = function (record) {
    if ((record.returnIndex === undefined) || (record.returnIndex < 0)) {
        return '';
    }

    var text = ` ${Color(Colors.muted, `return[${record.returnIndex}]`)}`;
    if (record.returnExpression !== undefined) {
        text += ` ${FormatExpression(record.returnExpression)}`;
    }
    if (record.returnValue !== undefined) {
        text += ` => ${record.returnValue}`;
    }

    return text;
}

var FormatStatus = function (statusName) {
    switch (statusName) {
        case 'FAILURE':
        case 'ABORT':
        case 'ERROR':
            return Color(Colors.error, statusName);

        case 'RUNNING':
            return Color(Colors.warning, statusName);

        case 'SUCCESS':
            return Color(Colors.command, statusName);

        default:
            return Color(Colors.text, statusName);
    }
}

var BBCodeFormatter = function (record) {
    var prefix = GetPrefix(record);

    switch (record.type) {
        case EVT_GROUP_START:
            return `${prefix} ${Color(Colors.group, 'start')}`;

        case EVT_GROUP_CONTINUE:
            return `${prefix} ${Color(Colors.group, 'continue')}`;

        case EVT_GROUP_COMPLETE:
            return `${prefix} ${Color(Colors.group, 'complete')}`;

        case EVT_GROUP_STOP:
            return `${prefix} ${Color(Colors.error, 'stop')}`;

        case EVT_EVENTSHEET_ADD:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.sheet, 'add')}`;

        case EVT_EVENTSHEET_REMOVE:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.warning, 'remove')}`;

        case EVT_EVENTSHEET_REMOVE_ALL:
            return `${prefix} ${Color(Colors.warning, 'removeall')} sheets=${FormatValue(record.sheetTitles)}`;

        case EVT_EVENTSHEET_OPEN:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.sheet, 'open')}`;

        case EVT_EVENTSHEET_CONDITION:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.condition, 'condition')}=${record.conditionPassed}`;

        case EVT_EVENTSHEET_ENTER:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.sheet, 'enter')}`;

        case EVT_EVENTSHEET_CATCH:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.warning, 'catch')}`;

        case EVT_EVENTSHEET_TICK:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.muted, 'tick')}`;

        case EVT_EVENTSHEET_STATUS:
            return `${prefix}${GetSheetLabel(record)} status=${FormatStatus(record.statusName)}`;

        case EVT_EVENTSHEET_CLOSE:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.muted, 'close')}`;

        case EVT_EVENTSHEET_EXIT:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.sheet, 'exit')}`;

        case EVT_EVENTSHEET_SKIP:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.warning, 'skip')} reason=${record.reason}`;

        case EVT_EVENTSHEET_ABORT:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.error, 'abort')}`;

        case EVT_EVENTSHEET_ROUND_BREAK:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.flow, 'roundbreak')} node="${record.nodeTitle || record.nodeName}"`;

        case EVT_LABEL_ENTER:
            return `${prefix}${GetSheetLabel(record)} label="${Color(Colors.flow, record.labelTitle)}" ${Color(Colors.sheet, 'enter')}`;

        case EVT_LABEL_EXIT:
            return `${prefix}${GetSheetLabel(record)} label="${Color(Colors.flow, record.labelTitle)}" ${Color(Colors.sheet, 'exit')}`;

        case EVT_COMMAND_START:
            return `${prefix}${GetSheetLabel(record)}${GetCommandLabel(record)} ${Color(Colors.command, 'start')}`;

        case EVT_COMMAND_END:
            return `${prefix}${GetSheetLabel(record)}${GetCommandLabel(record)} end success=${record.success}`;

        case EVT_COMMAND_PAUSE:
            return `${prefix}${GetSheetLabel(record)}${GetCommandLabel(record)} ${Color(Colors.pause, 'pause')}`;

        case EVT_COMMAND_RESUME:
            return `${prefix}${GetSheetLabel(record)}${GetCommandLabel(record)} ${Color(Colors.pause, 'resume')}`;

        case EVT_COMMAND_ABORT:
            return `${prefix}${GetSheetLabel(record)}${GetCommandLabel(record)} ${Color(Colors.error, 'abort')}`;

        case EVT_CONDITION_EVAL:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.condition, `condition.${record.conditionType}`)} ${FormatExpression(record.expression)} => ${record.result}${FormatReturnExpression(record)}`;

        case EVT_REPEAT_ITERATION:
            return `${prefix}${GetSheetLabel(record)} ${Color(Colors.flow, 'repeat')} ${record.iterationIndex}/${record.maxLoop} status=${FormatStatus(record.statusName)} node="${record.nodeTitle || record.nodeName}"`;

        case EVT_PAUSE_CLICK:
            return `${Color(Colors.pause, 'ES - pause.click')}`;

        case EVT_PAUSE_KEY:
            return `${Color(Colors.pause, `ES - pause.key`)} key="${record.key}"`;

        case EVT_PAUSE_INPUT:
            return `${Color(Colors.pause, 'ES - pause.input')}`;

        case EVT_RESUME_INPUT:
            return `${Color(Colors.pause, 'ES - resume.input')}`;

        default:
            return `${prefix} ${Color(Colors.muted, record.type)}`;
    }
}

export default BBCodeFormatter;
