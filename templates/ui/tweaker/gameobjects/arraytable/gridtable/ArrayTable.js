import GridTable from '../../../../gridtable/GridTable.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import MonitorTargetMethods from './MonitorTargetMethods.js';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods.js';

const RemoveItem = Phaser.Utils.Array.Remove;

class ArrayTable extends GridTable {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.ArrayTable';

    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.stopMonitorTarget();

        super.destroy(fromScene);
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
        this.refresh();
    }
}

Object.assign(
    ArrayTable.prototype,
    BindingTargetMethods,
    MonitorTargetMethods,
    InputRowTitleWidthMethods,
)

export default ArrayTable;
