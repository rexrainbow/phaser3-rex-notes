import GetNodeDepth from './GetNodeDepth.js';
import CloneData from './CloneData.js';

export default {
    createNodeRecord(type, node, tick) {
        var event = {
            type: type,
            treeID: tick.tree.id,
            tickID: this.tickID,
            nodeID: node.id,
        };

        if (this.includeNode) {
            event.nodeName = node.name;
            event.nodeTitle = node.title;
            event.category = node.category;
            event.depth = GetNodeDepth(node, tick.tree);
        }

        if (this.includeNodeMemory) {
            event.memory = CloneData(tick.getNodeMemory(node.id));
        }

        return event;
    },
}
