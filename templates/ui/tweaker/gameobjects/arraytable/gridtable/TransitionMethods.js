export default {
    deleteItemWithTransition(cellContainer) {
        if (!cellContainer || !cellContainer.cellItem) {
            return this;
        }

        var self = this;
        cellContainer.tweenSelf({
            alpha: 0,
            scaleY: 0,
            duration: 500,
            onComplete() {
                var cellItem = cellContainer.cellItem;
                cellContainer.cellItem = undefined;
                self.deleteItem(cellItem);
                self.resetPointerOver();
            },
        })

        return this;
    },

    addItemWithTransition(item) {
        this.addItem(item);
        this.scrollToBottom();

        // Last cell will be shown
        var newItemIndex = this.items.length - 1;
        var cellContainer = this.getCellContainer(newItemIndex);
        if (!cellContainer) {
            this.resetPointerOver();
            return this;
        }

        this
            .setChildLocalAlpha(cellContainer, 0)
            .setChildLocalScale(cellContainer, 1, 0)

        var self = this;
        cellContainer.tweenSelf({
            alpha: 1,
            scaleY: 1,
            duration: 500,
            onComplete() {
                self.resetPointerOver();
            }
        })

        return this;
    },

    clearItemsWithTransition() {
        var cellContainers = this.getAllCellContainers();
        if (!cellContainers || (cellContainers.length === 0)) {
            this.clearItems();
            this.resetPointerOver();
            return this;
        }

        var self = this;
        for (var i = 0, cnt = cellContainers.length; i < cnt; i++) {
            if (i === 0) {
                cellContainers[i].tweenSelf({
                    alpha: 0,
                    duration: 500,
                    onComplete() {
                        self.clearItems();
                        self.resetPointerOver();
                    }
                })
            } else {
                cellContainers[i].tweenSelf({
                    alpha: 0,
                    duration: 490,
                })
            }
        }

        return this;
    },
}
