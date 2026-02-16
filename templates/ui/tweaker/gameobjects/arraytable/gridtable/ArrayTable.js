import GridTable from '../../../../gridtable/GridTable.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import MonitorTargetMethods from './MonitorTargetMethods.js';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods.js';
import InstallAddButton from './InstallAddButton.js';
import InstallClearButton from './InstallClearButton.js';

const RemoveItem = Phaser.Utils.Array.Remove;

class ArrayTable extends GridTable {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.ArrayTable';

        this.resetCellSizeFlag = true;

        InstallClearButton.call(this, config);
        InstallAddButton.call(this, config);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.stopMonitorTarget();

        super.destroy(fromScene);
    }

    setItems(items, updateTable) {
        if (this.resetCellSizeFlag && (items.length > 0)) {
            this.resetCellSizeFlag = false;
            super.setItems(items, false);
            this.resetCellSizeFromCell();

        } else {
            super.setItems(items, updateTable);

        }
        return this;
    }

    setTitle(config) {
        var title = this.childrenMap.header;

        if (config.title || config.icon) {
            title.show().setTitle(config);
        } else {
            title.hide();
        }

        return this;
    }

    deleteItem(item) {
        // Called by CellContainer.onDeleteItem
        RemoveItem(this.items, item);
        this.refresh(); // Invoke *createCellContainerCallback* for each cell again
    }

    addItem(item) {
        // Calleed by add-button clicking
        this.items.push(item);

        this
            .refresh()
            .scrollToBottom()

        return this;
    }

    clearItems() {
        // Called by clear-button clicking
        this.items.length = 0;
        this.refresh();
        return this;
    }

}

Object.assign(
    ArrayTable.prototype,
    BindingTargetMethods,
    MonitorTargetMethods,
    InputRowTitleWidthMethods,
)

export default ArrayTable;
