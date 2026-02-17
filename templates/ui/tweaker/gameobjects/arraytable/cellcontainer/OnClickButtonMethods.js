export default {
    onClickDeleteButton() {
        // Called by clicking delete button
        if (!this.gridTable.isInTouching('mask')) {
            return;
        }

        var self = this;
        this.tweenSelf({
            alpha: 0,
            scaleY: 0,
            duration: 500,
            onComplete() {
                var cellItem = self.cellItem;
                self.cellItem = undefined;
                self.gridTable.deleteItem(cellItem);
            },
        })
    },

    onClickMoveUpButton() {
        if (!this.gridTable.isInTouching('mask')) {
            return;
        }

        var items = this.gridTable.items;
        if (!items || (items.length <= 1)) {
            return;
        }

        var currentIndex = items.indexOf(this.cellItem);
        if (currentIndex === -1) {
            return;
        }

        var targetIndex = (currentIndex === 0) ? (items.length - 1) : (currentIndex - 1);
        var tmp = items[currentIndex];
        items[currentIndex] = items[targetIndex];
        items[targetIndex] = tmp;

        this.gridTable
            .refresh()
            .scrollToRow(targetIndex);
    },

    onClickMoveDownButton() {
        if (!this.gridTable.isInTouching('mask')) {
            return;
        }

        var items = this.gridTable.items;
        if (!items || (items.length <= 1)) {
            return;
        }

        var currentIndex = items.indexOf(this.cellItem);
        if (currentIndex === -1) {
            return;
        }

        var targetIndex = (currentIndex === (items.length - 1)) ? 0 : (currentIndex + 1);
        var tmp = items[currentIndex];
        items[currentIndex] = items[targetIndex];
        items[targetIndex] = tmp;

        this.gridTable
            .refresh()
            .scrollToRow(targetIndex);
    },

}