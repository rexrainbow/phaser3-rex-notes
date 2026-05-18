import Scrollable from '../utils/scrollable/Scrollable';
import GetScrollMode from '../utils/GetScrollMode';
import GridTableCore from '../../../plugins/gridtable';
import InjectProperties from './InjectProperties';
import TableOnCellVisible from './TableOnCellVisible';
import TableSetInteractive from './input/TableSetInteractive';
import NOOP from '../../../plugins/utils/object/NOOP';
import SetItems from './SetItems';
import Refresh from './Refresh';
import ScrollMethods from './ScrollMethods';
import PointerOverTestMethods from './input/PointerOverTestMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class GridTable extends Scrollable {
    addChildrenMap: any;
    childrenMap: any;
    createCellContainerCallback: any;
    createCellContainerCallbackScope: any;
    eventEmitter: any;
    ignoreDestroy: any;
    items: any;
    resizeController: any;
    resizeControllerFlag: any;
    scene: any;
    setItems: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        // Create grid table core
        var scrollMode = GetScrollMode(config);
        var tableConfig = GetValue(config, 'table', undefined)
        if (tableConfig === undefined) {
            tableConfig = {};
        }
        tableConfig.scrollMode = (scrollMode === 2) ? 0 : scrollMode;
        tableConfig.clampTableOXY = GetValue(config, 'clampChildOY', false);
        var tableWidth = GetValue(tableConfig, 'width', undefined);
        var tableHeight = GetValue(tableConfig, 'height', undefined);
        var table = new GridTableCore(scene, 0, 0, tableWidth, tableHeight, tableConfig);
        scene.add.existing(table); // Important: Add to display list for touch detecting
        var expandWidth, expandHeight;
        if (tableConfig.scrollMode === 0) {
            expandWidth = (tableWidth === undefined);
            expandHeight = (tableHeight === undefined);
        } else {
            expandWidth = (tableHeight === undefined);
            expandHeight = (tableWidth === undefined);
        }
        // Inject properties for scrollable interface
        InjectProperties(table);
        // Set minWidth/minHeight to 0 if tableWidth/tableHeight is undefined
        table._minWidth = (tableWidth === undefined) ? 0 : undefined;
        table._minHeight = (tableHeight === undefined) ? 0 : undefined;

        // Fill config of scrollable
        config.type = 'rexGridTable';
        config.child = {
            gameObject: table,
            expandWidth: expandWidth,
            expandHeight: expandHeight,
        };
        var spaceConfig = GetValue(config, 'space', undefined);
        if (spaceConfig?: any) {
            spaceConfig.child = GetValue(spaceConfig, 'table', 0);
        }

        super(scene, config);

        this.addChildrenMap('table', table);
        this.addChildrenMap('mask', table.childrenMaskGameObject);

        this.eventEmitter = GetValue(config, 'eventEmitter', this);
        var callback = GetValue(config, 'createCellContainerCallback', NOOP);
        var scope = GetValue(config, 'createCellContainerCallbackScope', undefined);
        this.setCreateCellContainerCallback(callback, scope);
        TableOnCellVisible.call(this, table);

        this.resizeControllerFlag = false;
        var eventName = (scrollMode === 0) ? 'cellheightchange' : 'cellwidthchange';
        table.on(eventName, function() {
            this.resizeControllerFlag = true;
        }, this);

        if (GetValue(tableConfig, 'interactive', true)) {
            TableSetInteractive.call(this, table, tableConfig);
        }

        this.setItems(GetValue(config, 'items'), false);

        scene.game.events.on('poststep', this.onPostStep, this);
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.scene.game.events.off('poststep', this.onPostStep, this);

        super.destroy(fromScene);
    }

    setCreateCellContainerCallback(callback?: any, scope?: any) {
        this.createCellContainerCallback = callback;
        this.createCellContainerCallbackScope = scope;
        return this;
    }

    refresh() {
        this.setItems(this.items);
        return this;
    }

    getCell(cellIdx?: any) {
        var table = this.childrenMap.child;
        return table.getCell(cellIdx);
    }

    getCellContainer(cellIdx?: any) {
        var table = this.childrenMap.child;
        return table.getCellContainer(cellIdx);
    }

    getAllCellContainers(out?: any) {
        var table = this.childrenMap.child;
        return table.getAllCellContainers(out);
    }

    updateVisibleCell(cellIdx?: any) {
        var table = this.childrenMap.child;
        return table.updateVisibleCell(cellIdx);
    }

    resetAllCellsSize(width?: any, height?: any) {
        var table = this.childrenMap.child;
        table.resetAllCellsSize(width, height);
        return this;
    }

    resetCellSizeFromCell(cellIndex?: any) {
        var table = this.childrenMap.child;
        table.resetCellSizeFromCell(cellIndex);
        return this;
    }

    onPostStep() {
        if (this.resizeControllerFlag) {
            this.resizeController();
            this.resizeControllerFlag = false;
        }
    }

    get startRowIndex() {
        var table = this.childrenMap.child;
        return table.startRowIndex;
    }
}

var methods = {
    setItems: SetItems,
    refresh: Refresh,
}
Object.assign(
    GridTable.prototype,
    ScrollMethods,
    PointerOverTestMethods,
    methods,
);

export default GridTable;