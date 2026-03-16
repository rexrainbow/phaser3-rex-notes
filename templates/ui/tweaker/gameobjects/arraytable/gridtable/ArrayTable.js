import GridTable from '../../../../gridtable/GridTable.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import MonitorTargetMethods from './MonitorTargetMethods.js';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods.js';
import InstallAddButton from './InstallAddButton.js';
import InstallClearButton from './InstallClearButton.js';
import InstallCellInteractiveEvents from './InstallCellInteractiveEvents.js';
import OnClickButtonMethods from './OnClickButtonMethods.js';
import TransitionMethods from './TransitionMethods.js';
import SetValue from '../../../../../../plugins/utils/object/SetValue.js';

class ArrayTable extends GridTable {
    constructor(scene, config) {
        SetValue(config, 'reuseCellContainer', true);
        SetValue(config, 'table.enableLayer', true);
        SetValue(config, 'table.over.mode', 'boundary');

        super(scene, config);
        this.type = 'rexTweaker.ArrayTable';

        this.resetCellSizeFlag = true;
        this.lastItemsCount = undefined; // For monitor

        this.setReadOnly(false);

        InstallClearButton.call(this, config);
        InstallAddButton.call(this, config);
        InstallCellInteractiveEvents.call(this, config);

        var header = this.childrenMap.header;
        if (header) {
            this.bringChildToTop(header)
        }
        var footer = this.childrenMap.footer;
        if (footer) {
            this.bringChildToTop(footer)
        }
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

        if (config && (config.title || config.icon)) {
            title.show().setTitle(config);
        } else {
            title.hide();
        }

        return this;
    }

    setReadOnly(value) {
        if (value === undefined) {
            value = true;
        }

        this.readOnly = value;

        var cellConteiners = this.getAllCellContainers();
        for (var i = 0, cnt = cellConteiners.length; i < cnt; i++) {
            cellConteiners[i].setReadOnly(value);
        }

        return this;
    }
}

Object.assign(
    ArrayTable.prototype,
    BindingTargetMethods,
    MonitorTargetMethods,
    InputRowTitleWidthMethods,
    OnClickButtonMethods,
    TransitionMethods,
)

export default ArrayTable;
