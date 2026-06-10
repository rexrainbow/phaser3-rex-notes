import {
    EVT_GROUP_STOP,
    EVT_EVENTSHEET_STATUS,
    EVT_EVENTSHEET_ABORT,
    EVT_COMMAND_END,
    EVT_COMMAND_ABORT,
} from '../../eventsheetmanager/constants.js';

const ErrorStatusNames = [
    'FAILURE',
    'ABORT',
    'ERROR',
];

var DefaultFilter = function (level) {
    if (level !== 'error') {
        return undefined;
    }

    return function (record) {
        if ((record.type === EVT_GROUP_STOP) ||
            (record.type === EVT_EVENTSHEET_ABORT) ||
            (record.type === EVT_COMMAND_ABORT)) {
            return true;
        }

        if (record.type === EVT_EVENTSHEET_STATUS) {
            return (ErrorStatusNames.indexOf(record.statusName) !== -1);
        }

        if (record.type === EVT_COMMAND_END) {
            return !record.success;
        }

        return false;
    }
}

export default DefaultFilter;
