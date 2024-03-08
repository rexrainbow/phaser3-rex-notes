import RemoveItem from '../../../../utils/array/Remove.js';

export default {
    removeAllEventSheets() {
        this.trees.forEach(function (tree) {
            this.blackboard.removeTreeData(tree.id);
        }, this)
        this.trees.length = 0;
        this.pendingTrees.length = 0;
        return this;
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
}