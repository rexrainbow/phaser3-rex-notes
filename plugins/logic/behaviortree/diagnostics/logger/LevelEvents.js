import {
    EVT_TICK_START,
    EVT_TICK_END,
    EVT_NODE_STATUS,
    EVT_NODE_ABORT,
    EVT_NODE_LOG,
} from '../../constants.js';

export default {
    error: [
        EVT_TICK_END,
        EVT_NODE_STATUS,
        EVT_NODE_ABORT,
    ],
    status: [
        EVT_TICK_END,
        EVT_NODE_STATUS,
        EVT_NODE_ABORT,
        EVT_NODE_LOG,
    ],
    tick: [
        EVT_TICK_START,
        EVT_TICK_END,
    ],
    verbose: 'all',
};
