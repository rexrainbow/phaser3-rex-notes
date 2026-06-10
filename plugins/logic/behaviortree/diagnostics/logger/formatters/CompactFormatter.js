import {
    EVT_TICK_START,
    EVT_TICK_END,
    EVT_NODE_STATUS,
    EVT_NODE_ABORT,
    EVT_NODE_LOG,
} from '../../../constants.js';

var GetNodeLabel = function (record) {
    var label = record.nodeName || record.nodeTitle || 'node';
    if (record.nodeID !== undefined) {
        label += `#${record.nodeID}`;
    }
    return label;
}

var CompactFormatter = function (record) {
    switch (record.type) {
        case EVT_TICK_START:
            return `[BT ${record.treeID}] tick#${record.tickID} start`;

        case EVT_TICK_END:
            return `[BT ${record.treeID}] tick#${record.tickID} ${record.statusName} nodes=${record.nodeCount} open=${(record.openNodeIDs) ? record.openNodeIDs.length : 0}`;

        case EVT_NODE_STATUS:
            return `[BT ${record.treeID}] tick#${record.tickID} ${GetNodeLabel(record)} -> ${record.statusName}`;

        case EVT_NODE_ABORT:
            return `[BT ${record.treeID}] tick#${record.tickID} ${GetNodeLabel(record)} abort`;

        case EVT_NODE_LOG:
            return `[BT ${record.treeID}] tick#${record.tickID} ${GetNodeLabel(record)} log: ${record.message}`;

        default:
            return `[BT ${record.treeID}] tick#${record.tickID} ${record.type} ${GetNodeLabel(record)}`;
    }
}

export default CompactFormatter;
