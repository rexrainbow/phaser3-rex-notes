import {
    EVT_TICK_END,
    EVT_NODE_STATUS,
    EVT_NODE_ABORT,
} from '../../constants.js';

const ErrorStatusNames = [
    'ABORT',
    'ERROR',
];

var DefaultFilter = function (level) {
    if (level !== 'error') {
        return undefined;
    }

    return function (record) {
        if (record.type === EVT_NODE_ABORT) {
            return true;
        }

        if (record.type === EVT_NODE_STATUS) {
            return (ErrorStatusNames.indexOf(record.statusName) !== -1);
        }

        if (record.type === EVT_TICK_END) {
            return (ErrorStatusNames.indexOf(record.statusName) !== -1);
        }

        return false;
    }
}

export default DefaultFilter;
