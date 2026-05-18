import GridTable from '../../../../gridtable/GridTable';
import BindingTargetMethods from './BindingTargetMethods';
import MonitorTargetMethods from './MonitorTargetMethods';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods';
import InstallAddButton from './InstallAddButton';
import InstallClearButton from './InstallClearButton';
import InstallCellInteractiveEvents from './InstallCellInteractiveEvents';
import OnClickButtonMethods from './OnClickButtonMethods';
import TransitionMethods from './TransitionMethods';
import SetValue from '../../../../../../plugins/utils/object/SetValue';

class ArrayTable extends GridTable {
    bringChildToTop: any;
    childrenMap: any;
    getAllCellContainers: any;
    ignoreDestroy: any;
    lastItemsCount: any;
    readOnly: any;
    resetCellSizeFlag: any;
    resetCellSizeFromCell: any;
    scene: any;
    stopMonitorTarget: any;
    type: any;

    constructor(scene?: any, config?: any) {
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
        if (header?: any) {
            this.bringChildToTop(header)
        }
        var footer = this.childrenMap.footer;
        if (footer?: any) {
            this.bringChildToTop(footer)
        }
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.stopMonitorTarget();

        super.destroy(fromScene);
    }

    setItems(items?: any, updateTable?: any) {
        if (this.resetCellSizeFlag && (items.length > 0)) {
            this.resetCellSizeFlag = false;
            super.setItems(items, false);
            this.resetCellSizeFromCell();

        } else {
            super.setItems(items, updateTable);

        }
        return this;
    }

    setTitle(config?: any) {
        var title = this.childrenMap.header;

        if (config && (config.title || config.icon)) {
            title.show().setTitle(config);
        } else {
            title.hide();
        }

        return this;
    }

    setReadOnly(value?: any) {
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