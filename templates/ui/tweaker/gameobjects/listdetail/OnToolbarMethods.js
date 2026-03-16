import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import DeepMerge from '../../../../../plugins/utils/object/DeepMerge.js';

var IsObjectValue = function (value) {
    return !!value && (typeof (value) === 'object') && !Array.isArray(value);
}

export default {

    onToolbarDelete() {
        if (this.readOnly) {
            return;
        }

        var index = this.selectedIndex;
        if (index == null) {
            return;
        }

        var listTable = this.leftPanel;
        var cellContainer = listTable.getCellContainer(index);
        if (cellContainer) {
            listTable.deleteItemWithTransition(cellContainer);
            return;
        }

        listTable.deleteItemByIndex(index);
        if (listTable.resetPointerOver) {
            listTable.resetPointerOver();
        }
    },

    onToolbarDuplicate() {
        if (this.readOnly) {
            return;
        }

        var index = this.selectedIndex;
        if (index == null) {
            return;
        }

        var listTable = this.leftPanel;
        var items = listTable.items;
        var currentItem = items[index];
        if (!IsObjectValue(currentItem)) {
            console.error('[Tweaker][ListDetail] Duplicate aborted. Current selected item is not an object. This is an application-level design error.');
            return;
        }

        var defaultItem = this.createDefaultItemFromToolbar('duplicateButton', 'Duplicate');
        if (!defaultItem) {
            return;
        }

        // Start from current item, then fill missing keys from default item.
        var newItem = DeepClone(currentItem);
        DeepMerge(newItem, defaultItem);

        var insertIndex = index + 1;
        items.splice(insertIndex, 0, newItem);
        listTable.lastItemsCount = items.length;
        listTable.refresh();
        listTable.emit('items.change', 'add', {
            index: insertIndex,
            item: newItem
        });

        this.selectItem(insertIndex, true);
    },

    onToolbarReset() {
        if (this.readOnly) {
            return;
        }

        var index = this.selectedIndex;
        if (index == null) {
            return;
        }

        var listTable = this.leftPanel;
        var items = listTable.items;
        var currentItem = items[index];
        if (!IsObjectValue(currentItem)) {
            console.error('[Tweaker][ListDetail] Reset aborted. Current selected item is not an object. This is an application-level design error.');
            return;
        }

        var defaultItem = this.createDefaultItemFromToolbar('resetButton', 'Reset');
        if (!defaultItem) {
            return;
        }

        // Clear all existing keys, then apply default keys in-place.
        for (var key in currentItem) {
            if (currentItem.hasOwnProperty(key)) {
                delete currentItem[key];
            }
        }
        DeepMerge(currentItem, defaultItem);

        // Refresh editor and list row display.
        this.rightPanel.setBindingTarget(currentItem);
        listTable.updateVisibleCell(index);
        this.updateEditorTitle(index, currentItem, items);
    },

    onToolbarPrevious() {
        var index = this.selectedIndex;
        if (index == null) {
            return;
        }

        if (index <= 0) {
            return;
        }

        this.selectItem(index - 1, true);
    },

    onToolbarNext() {
        var index = this.selectedIndex;
        if (index == null) {
            return;
        }

        var listTable = this.leftPanel;
        var items = listTable.items;
        if (index >= (items.length - 1)) {
            return;
        }

        this.selectItem(index + 1, true);
    },

    createDefaultItemFromToolbar(buttonKey, actionName) {
        var editorContainer = this.rightPanel;
        var button = editorContainer.childrenMap[buttonKey];
        var callback = (button) ? button.createDefaultItem : undefined;
        if (!callback) {
            console.error(`[Tweaker][ListDetail] ${actionName} aborted. createDefaultItem is required and should return an object. This is an application-level design error.`);
            return null;
        }

        var defaultItem = callback();
        if (!IsObjectValue(defaultItem)) {
            var valueType = (defaultItem === null) ? 'null' : typeof (defaultItem);
            console.error(`[Tweaker][ListDetail] ${actionName} aborted. createDefaultItem() returned ${valueType}, expected object. This is an application-level design error.`);
            return null;
        }

        return defaultItem;
    },

}