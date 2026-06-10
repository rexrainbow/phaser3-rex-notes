import {
    IDLE,
    SUCCESS,
    FAILURE,
    RUNNING,
    ABORT,
    ERROR,
} from '../../constants.js';

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

export default GetStatusName;
