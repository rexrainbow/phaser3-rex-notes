export default {
    deleteItemByIndex(index) {
        // Called by CellContainer.onDeleteItem
        this.items.splice(index, 1);
        this.lastItemsCount = this.items.length; // Prevent monitor triggering

        this.refresh(); // Invoke createCellContainerCallback for each cell again        
        return this;
    },

    addItem(item) {
        // Called by add-button clicking
        this.items.push(item);
        this.lastItemsCount = this.items.length; // Prevent monitor triggering

        this.refresh();
        return this;
    },

    clearItems() {
        // Called by clear-button clicking
        this.items.length = 0;
        this.lastItemsCount = this.items.length; // Prevent monitor triggering

        this.refresh();
        return this;
    },

}
