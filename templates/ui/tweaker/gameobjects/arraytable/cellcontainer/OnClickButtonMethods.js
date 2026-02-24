export default {
    onClickDeleteButton() {
        // Called by clicking delete button
        if (!this.gridTable.isInTouching('mask')) {
            return;
        }

        this.gridTable.deleteItemWithTransition(this);
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
