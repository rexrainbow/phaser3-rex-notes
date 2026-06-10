import GetStatusName from './GetStatusName.js';
import CloneData from './CloneData.js';
import {
    EVT_NODE_STATUS,
    EVT_NODE_LOG,
} from '../../constants.js';

export default {
    createNodeEventHandler(eventName) {
        return function (node, tick) {
            this.addNodeEvent(eventName, node, tick);
        };
    },

    onNodeStatus(node, status, tick) {
        if (!this.hasEvent(EVT_NODE_STATUS)) {
            return;
        }

        var event = this.createNodeRecord(EVT_NODE_STATUS, node, tick);
        event.status = status;
        event.statusName = GetStatusName(status);
        this.addEvent(event, tick);
    },

    onNodeLog(node, message, data, tick) {
        if (!this.hasEvent(EVT_NODE_LOG)) {
            return;
        }

        var event = this.createNodeRecord(EVT_NODE_LOG, node, tick);
        event.message = message;

        if (data !== undefined) {
            event.data = CloneData(data);
        }

        this.addEvent(event, tick);
    },

    addNodeEvent(eventName, node, tick) {
        if (!this.hasEvent(eventName)) {
            return;
        }

        this.addEvent(this.createNodeRecord(eventName, node, tick), tick);
    },
}
