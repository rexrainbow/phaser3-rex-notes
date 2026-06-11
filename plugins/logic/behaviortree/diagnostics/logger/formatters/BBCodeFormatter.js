import {
    EVT_TICK_START,
    EVT_TICK_END,
    EVT_NODE_STATUS,
    EVT_NODE_ABORT,
    EVT_NODE_LOG,
} from '../../../constants.js';

const Colors = {
    tree: '#5DADE2',
    node: '#48C9B0',
    success: '#58D68D',
    running: '#F5B041',
    failure: '#EC7063',
    muted: '#AEB6BF',
    log: '#F4D03F',
};

var Color = function (color, text) {
    return `[color=${color}]${text}[/color]`;
}

var Bold = function (text) {
    return `[b]${text}[/b]`;
}

var GetPrefix = function (record) {
    return `${Bold(Color(Colors.tree, `BT ${record.treeID}`))} tick#${record.tickID}`;
}

var GetNodeLabel = function (record) {
    var label = record.nodeName || record.nodeTitle || 'node';
    if (record.nodeID !== undefined) {
        label += `#${record.nodeID}`;
    }
    return Color(Colors.node, label);
}

var FormatStatus = function (statusName) {
    switch (statusName) {
        case 'SUCCESS':
            return Color(Colors.success, statusName);

        case 'RUNNING':
            return Color(Colors.running, statusName);

        case 'FAILURE':
        case 'ABORT':
        case 'ERROR':
            return Color(Colors.failure, statusName);

        default:
            return Color(Colors.muted, statusName);
    }
}

var BBCodeFormatter = function (record) {
    switch (record.type) {
        case EVT_TICK_START:
            return `${GetPrefix(record)} ${Color(Colors.tree, 'start')}`;

        case EVT_TICK_END:
            return `${GetPrefix(record)} ${FormatStatus(record.statusName)} nodes=${record.nodeCount} open=${(record.openNodeIDs) ? record.openNodeIDs.length : 0}`;

        case EVT_NODE_STATUS:
            return `${GetPrefix(record)} ${GetNodeLabel(record)} -> ${FormatStatus(record.statusName)}`;

        case EVT_NODE_ABORT:
            return `${GetPrefix(record)} ${GetNodeLabel(record)} ${Color(Colors.failure, 'abort')}`;

        case EVT_NODE_LOG:
            return `${GetPrefix(record)} ${GetNodeLabel(record)} ${Color(Colors.log, 'log')}: ${record.message}`;

        default:
            return `${GetPrefix(record)} ${Color(Colors.muted, record.type)} ${GetNodeLabel(record)}`;
    }
}

export default BBCodeFormatter;
