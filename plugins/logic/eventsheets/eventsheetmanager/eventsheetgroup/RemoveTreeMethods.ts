import RemoveItem from '../../../../utils/array/Remove';

export default {
    removeAllEventSheets() {
        this.trees.forEach(function(eventsheet?: any) {
            this.blackboard.removeTreeData(eventsheet.id);
        }, this)
        this.trees.length = 0;
        this.pendingTrees.length = 0;
        return this;
    },

    removeEventSheet(title?: any) {
        var removedTrees = [];
        this.trees.forEach(function(eventsheet?: any) {
            if (!eventsheet.title === title) {
                return;
            }
            var status = this.getTreeState(eventsheet);
            if (status === RUNNING) {
                // Can't remove RUNNING eventsheet
                return;
            }

            removedTrees.push(eventsheet);
            this.blackboard.removeTreeData(eventsheet.id);
        }, this);

        if (removedTrees.length > 0) {
            RemoveItem(this.trees, removedTrees);
            RemoveItem(this.pendingTrees, removedTrees);
        }

        return this;
    },
}