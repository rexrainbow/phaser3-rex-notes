export default {
    onClickDeleteButton() {
        if (this.gridTable.readOnly) {
            return;
        }

        // Called by clicking delete button
        if (!this.gridTable.isInTouching('mask')) {
            return;
        }

        this.gridTable.deleteItemWithTransition(this);
    },

    onClickMoveUpButton() {
        if (this.gridTable.readOnly) {
            return;
        }

        if (!this.gridTable.isInTouching('mask')) {
            return;
        }

        var items = this.gridTable.items;
        if (!items || (items.length <= 1)) {
            return;
        }

        var currentIndex = this.cellIndex;
        var targetIndex = (currentIndex === 0) ? (items.length - 1) : (currentIndex - 1);
        var tmp = items[currentIndex];
        items[currentIndex] = items[targetIndex];
        items[targetIndex] = tmp;

        this.gridTable
            .refresh()
            .scrollToRow(targetIndex);

        this.gridTable.emit('items.change', 'move', {
            fromIndex: currentIndex,
            toIndex: targetIndex
        });
    },

    onClickMoveDownButton() {
        if (this.gridTable.readOnly) {
            return;
        }

        if (!this.gridTable.isInTouching('mask')) {
            return;
        }

        var items = this.gridTable.items;
        if (!items || (items.length <= 1)) {
            return;
        }

        var currentIndex = this.cellIndex;
        var targetIndex = (currentIndex === (items.length - 1)) ? 0 : (currentIndex + 1);
        var tmp = items[currentIndex];
        items[currentIndex] = items[targetIndex];
        items[targetIndex] = tmp;

        this.gridTable
            .refresh()
            .scrollToRow(targetIndex);

        this.gridTable.emit('items.change', 'move', {
            fromIndex: currentIndex,
            toIndex: targetIndex
        });
    },

}
