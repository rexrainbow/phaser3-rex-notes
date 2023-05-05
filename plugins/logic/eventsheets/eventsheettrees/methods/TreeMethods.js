import GetCustomNodeMapping from './GetCustomNodeMapping.js';
import RemoveItem from '../../../../utils/array/Remove.js';
import { BehaviorTree, PENDING, RUNNING } from '../../../behaviortree';
import DeepClone from '../../../../utils/object/DeepClone.js';

export default {
    // Override it
    addEventSheet(s, config) {

    },

    addTree(tree) {
        this.trees.push(tree);
        return this;
    },

    getTreeState(tree) {
        var treeID = (typeof (tree) === 'string') ? tree : tree.id;
        return this.blackboard.getTreeState(treeID);
    },

    clearAllEventSheets() {
        this.trees.forEach(function (tree) {
            this.blackboard.removeTreeData(tree.id);
        }, this)
        this.trees.length = 0;
        this.pendingTrees.length = 0;
        return this;
    },

    getEventSheetTitleList(out) {
        if (out === undefined) {
            out = [];
        }
        this.trees.forEach(function (tree) {
            out.push(tree.title);
        })
        return out;
    },

    removeEventSheet(title) {
        var removedTrees = [];
        this.trees.forEach(function (tree) {
            if (!tree.title === title) {
                return;
            }
            var status = this.getTreeState(tree);
            if (status === RUNNING) {
                // Can't remove RUNNING tree
                return;
            }

            removedTrees.push(tree);
            this.blackboard.removeTreeData(tree.id);
        }, this);

        if (removedTrees.length > 0) {
            RemoveItem(this.trees, removedTrees);
            RemoveItem(this.pendingTrees, removedTrees);
        }

        return this;
    },

    dumpTrees() {
        var out = [];
        this.trees.forEach(function (tree) {
            out.push(tree.dump());
        })
        return out;
    },

    loadTrees(dataArray) {
        dataArray.forEach(function (data) {
            var tree = new BehaviorTree({
                id: data.id,
                title: data.title,
                properties: DeepClone(data.properties),
            });
            tree.load(data, GetCustomNodeMapping());
            this.trees.push(tree);
        }, this);
        return this;
    }

}