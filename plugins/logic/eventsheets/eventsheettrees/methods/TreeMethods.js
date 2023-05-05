import GetCustomNodeMapping from './GetCustomNodeMapping.js';
import RemoveItem from '../../../../utils/array/Remove.js';
import { BehaviorTree } from '../../../behaviortree';
import DeepClone from '../../../../utils/object/DeepClone.js';

export default {
    // Override it
    addEventSheet(s, config) {

    },

    addTree(tree) {
        this.trees.push(tree);
        return this;
    },

    clearAllEventSheets() {
        this.trees.forEach(function (tree) {
            this.blackboard.removeTreeData(tree.id);
        }, this)
        this.trees.length = 0;
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
            removedTrees.push(tree);
            this.blackboard.removeTreeData(tree.id);
        }, this);

        RemoveItem(this.trees, removedTrees);

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