import Marked2Node from './marked2node/Marked2Node.js';
import GetCustomNodeMapping from './GetCustomNodeMapping.js';
import RemoveItem from '../../../utils/array/Remove.js';

export default {
    addEventSheet(markedString, {
        lineReturn = '\\'
    } = {}) {
        this.tree.root.addChild(Marked2Node(markedString, { lineReturn }));
        return this;
    },

    clearAllEventSheets() {
        this.tree.setRoot(new Parallel({ title: 'root', finishMode: 1 }));
        this.blackboard.removeTreeData(this.tree.id);
        return this;
    },

    getEventSheetTitleList(out) {
        if (out === undefined) {
            out = [];
        }
        var nodes = this.tree.root.children;
        for (var i = 0, cnt = nodes.length; i < cnt; i++) {
            out.push(nodes[i].title);
        }
        return out;
    },

    removeEventSheet(title) {
        var removedNode;
        var nodes = this.tree.root.children;
        for (var i = 0, cnt = nodes.length; i < cnt; i++) {
            var node = nodes[i];
            if (node.title === title) {
                removedNode = node;
                break;
            }
        }
        if (!removedNode) {
            return this;
        }

        var nodes = this.tree.getChildrenNodes(removedNode, [removedNode]);
        var treeID = this.tree.id;
        for (var i = 0, cnt = nodes.length; i < cnt; i++) {
            this.blackboard.removeNodeData(treeID, nodes[i].id);
        }

        RemoveItem(this.tree.root.children, removedNode);

        this.blackboard.setData('$isOpen', false, treeID, this.tree.root.id);

        return this;
    },

    dumpTree() {
        return this.tree.dump();
    },

    loadTree(data) {
        this.tree.load(data, GetCustomNodeMapping());
        return this;
    }

}