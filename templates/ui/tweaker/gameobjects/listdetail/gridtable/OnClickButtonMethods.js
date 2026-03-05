export default {
    deleteItemByIndex(index) {
        // Called by CellContainer.onDeleteItem
        var removedItem = this.items[index];
        this.items.splice(index, 1);
        this.lastItemsCount = this.items.length; // Prevent monitor triggering

        this.refresh(); // Invoke createCellContainerCallback for each cell again        
        this.emit('items.change', 'delete', {
            index: index,
            item: removedItem
        });
        return this;
    },

    addItem(item) {
        // Called by add-button clicking
        this.items.push(item);
        this.lastItemsCount = this.items.length; // Prevent monitor triggering

        this.refresh();
        this.emit('items.change', 'add', {
            index: this.items.length - 1,
            item: item
        });
        return this;
    },

    clearItems() {
        // Called by clear-button clicking
        this.items.length = 0;
        this.lastItemsCount = this.items.length; // Prevent monitor triggering

        this.refresh();
        this.emit('items.change', 'clear');
        return this;
    },

}
