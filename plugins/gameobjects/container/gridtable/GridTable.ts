import ContainerLite from '../../container/containerlite/ContainerLite';
import Table from './table/Table';
import Methods from './methods/Methods';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const Group = PhaserGameObjects.Group;
const GetValue = PhaserUtils.Objects.GetValue;

class GridTable extends ContainerLite {
    height: any;
    width: any;

    _tableOX: any;
    _tableOY: any;
    cellContainersPool: any;
    clampTableOXY: any;
    destroyChildrenMask: any;
    displayHeight: any;
    displayWidth: any;
    enableLayer: any;
    execeedBottomState: any;
    execeedLeftState: any;
    execeedRightState: any;
    execeedTopState: any;
    expandCellSize: any;
    fixedCellSize: any;
    ignoreDestroy: any;
    iterateVisibleCell: any;
    on: any;
    originX: any;
    originY: any;
    preVisibleCells: any;
    scene: any;
    scrollMode: any;
    setTableOX: any;
    setTableOY: any;
    setupChildrenMask: any;
    startFromBottomEnable: any;
    startRowIndex: any;
    table: any;
    type: any;
    updateTable: any;
    visibleCells: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        super(scene, x, y, width, height);
        this.type = 'rexGridTable';
        this._tableOX = 0;
        this._tableOY = 0;
        this.visibleCells = new Set();
        this.preVisibleCells = new Set();
        this.execeedTopState = false;
        this.execeedBottomState = false;
        this.execeedLeftState = false;
        this.execeedRightState = false;

        var reuseCellContainer = GetValue(config, 'reuseCellContainer', false);
        if (reuseCellContainer?: any) {
            this.cellContainersPool = new Group(scene); // Don't add Group into update list, I will destroy it manually
        }

        var callback = GetValue(config, 'cellVisibleCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'cellVisibleCallbackScope', undefined);
            this.on('cellvisible', callback, scope);
        }
        callback = GetValue(config, 'cellInvisibleCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'cellInvisibleCallbackScope', undefined);
            this.on('cellinvisible', callback, scope);
        }

        if (GetValue(config, 'enableLayer', false)) {
            this.enableLayer();
        }

        this.setupChildrenMask(GetValue(config, 'mask', undefined));

        this.setScrollMode(GetValue(config, 'scrollMode', 0));
        this.setClampMode(GetValue(config, 'clampTableOXY', true));
        this.setStartFromBottomEnable(GetValue(config, 'startFromBottom', false));

        // Pre-process cell size
        var cellWidth, cellHeight, columns;
        var scrollY = (this.scrollMode === 0);
        if (scrollY?: any) {  // scroll y
            cellWidth = config.cellWidth;
            cellHeight = config.cellHeight;
            columns = config.columns;
        } else {  // scroll x
            cellWidth = config.cellHeight;
            cellHeight = config.cellWidth;
            columns = GetValue(config, 'rows', config.columns);
        }

        this.fixedCellSize = GetValue(config, 'fixedCellSize', false);
        this.expandCellSize = (!this.fixedCellSize) && (cellWidth === undefined);

        if (!columns) {
            columns = 1;  // Default columns
        }
        if (this.fixedCellSize) {
            columns = Math.max(Math.floor(this.instWidth / cellWidth), 1);
        } else if (this.expandCellSize) {
            var width = (scrollY) ? this.width : this.height;
            cellWidth = width / columns;
        }

        config.cellWidth = cellWidth;
        config.cellHeight = cellHeight;
        config.columns = columns;

        this.table = new Table(this, config);

        this.updateTable();
    }

    destroy(fromScene?: any) {  // preDestroy method does not have fromScene parameter
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.destroyChildrenMask();

        this.table.destroy(fromScene);
        this.table = undefined;
        if (this.cellContainersPool) {
            this.cellContainersPool.destroy(true);
            this.cellContainersPool = undefined;
        }

        super.destroy(fromScene);
    }

    setScrollMode(mode?: any) {
        if (typeof (mode) === 'string') {
            mode = SCROLLMODE[mode.toLowerCase()];
        }
        this.scrollMode = mode;
        return this;
    }

    setClampMode(mode?: any) {
        if (mode === undefined) {
            mode = true;
        }
        this.clampTableOXY = mode;
        return this;
    }

    setStartFromBottomEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.startFromBottomEnable = enable;
        return this;
    }

    get tableOY() {
        return this._tableOY;
    }

    get tableOX() {
        return this._tableOX;
    }

    set tableOY(oy) {
        this.setTableOY(oy).updateTable();
    }

    set tableOX(ox) {
        this.setTableOX(ox).updateTable();
    }

    setTableOXY(ox?: any, oy?: any) {
        this.setTableOY(oy).setTableOX(ox);
        return this;
    }

    addTableOY(dy?: any) {
        this.setTableOY(this.tableOY + dy);
        return this;
    }

    addTableOX(dx?: any) {
        this.setTableOX(this.tableOX + dx);
        return this;
    }

    addTableOXY(dx?: any, dy?: any) {
        this.addTableOY(dy).addTableOX(dx);
        return this;
    }

    setTableOYByPercentage(percentage?: any) {
        this.setTableOY(-this.tableVisibleHeight * percentage);
        return this;
    }

    getTableOYPercentage() {
        var tableVisibleHeight = this.tableVisibleHeight;
        if (tableVisibleHeight === 0) {
            return 0;
        }
        return (this.tableOY / -tableVisibleHeight);
    }

    setTableOXByPercentage(percentage?: any) {
        this.setTableOX(-this.tableVisibleWidth * percentage);
        return this;
    }

    getTableOXPercentage() {
        var tableVisibleWidth = this.tableVisibleWidth;
        if (tableVisibleWidth === 0) {
            return 0;
        }
        return (this.tableOX / -tableVisibleWidth);
    }

    set t(value) {
        this.setTableOYByPercentage(value).updateTable();
    }

    get t() {
        return this.getTableOYPercentage();
    }

    set s(value) {
        this.setTableOXByPercentage(value).updateTable();
    }

    get s() {
        return this.getTableOXPercentage();
    }

    scrollToBottom() {
        this.t = 1;
        // t will be 0 if table does not exceed visible area
        if (this.t === 0) {
            return this;
        }

        // Table height might be expanded while cells are visible        
        do {
            this.t = 1;
        } while (this.t !== 1)

        return this;
    }

    scrollToRow(rowIndex?: any) {
        // To get all height of cells
        this.scrollToBottom();

        var height = this.table.rowIndexToHeight(0, rowIndex - 1)
        this.setTableOY(-height).updateTable();
        return this;
    }

    scrollToNextRow(rowCount?: any) {
        if (rowCount === undefined) {
            rowCount = 1;
        }
        this.scrollToRow(this.startRowIndex + rowCount);
        return this;
    }

    getCell(cellIdx?: any) {
        return this.table.getCell(cellIdx, true);
    }

    getCellContainer(cellIdx?: any) {
        var cell = this.table.getCell(cellIdx, false);
        var container;
        if (cell?: any) {
            container = cell.getContainer();
        }
        return container;
    }

    getAllCellContainers(out?: any) {
        if (out === undefined) {
            out = [];
        }
        this.iterateVisibleCell(function(cell?: any) {
            var cellContainer = (cell) ? cell.getContainer() : null;
            if (cellContainer?: any) {
                out.push(cellContainer);
            }
        })
        return out;
    }

    get cellsCount() {
        return this.table.cellsCount;
    }

    get columnCount() {
        return this.table.colCount;
    }

    setCellHeight(cellIdx?: any, height?: any) {
        var cell;
        if (typeof (cellIdx) === 'number') {
            cell = this.table.getCell(cellIdx, true);
        } else {
            cell = cellIdx;
        }
        cell.height = height; // Only worked when scrollMode is 0
        return this;
    }

    setCellWidth(cellIdx?: any, width?: any) {
        var cell;
        if (typeof (cellIdx) === 'number') {
            cell = this.table.getCell(cellIdx, true);
        } else {
            cell = cellIdx;
        }
        cell.width = width; // Only worked when scrollMode is 1
        return this;
    }

    resetAllCellsSize(width?: any, height?: any) {
        // Swap width and height if scrollMode is 1
        if (this.scrollMode === 1) {
            var temp = width;
            width = height;
            height = temp;
        }

        this.table
            .setDefaultCellHeight(height)
            .setDefaultCellWidth(width)

        var cells = this.table.cells;
        for (var i = 0, cnt = cells.length; i < cnt; i++) {
            var cell = cells[i];
            if (!cell) {
                continue;
            }
            cell.deltaHeight = 0;
        }

        if (this.fixedCellSize) {
            var colCount = Math.floor(this.instWidth / width);
            this.table.setColumnCount(colCount);
        }

        this.updateTable(true, true);

        return this;
    }

    get instHeight() {
        return (this.scrollMode === 0) ? this.height : this.width;
    }

    get instWidth() {
        return (this.scrollMode === 0) ? this.width : this.height;
    }

    get tableHeight() {
        return this.table.totalRowsHeight;
    }

    get tableWidth() {
        return this.table.totalColumnWidth;
    }

    get tableOYOffset() {
        if (this.startFromBottomEnable) {
            var h = this.tableHeight - this.instHeight;
            if (h < 0) {
                return -h;
            }
        }

        return 0;
    }

    get topTableOY() {
        return 0;
    }

    get bottomTableOY() {
        return -this.tableVisibleHeight;
    }

    get leftTableOX() {
        return 0;
    }

    get rightTableOX() {
        return -this.tableVisibleWidth;
    }

    get tableVisibleHeight() {
        var h = this.tableHeight - this.instHeight;
        if (h < 0) {
            h = 0;
        }
        return h;
    }

    get tableVisibleWidth() {
        var w = this.tableWidth - this.instWidth;
        if (w < 0) {
            w = 0;
        }
        return w;
    }

    get topLeftX() {
        return -(this.displayWidth * this.originX);
    }
    get topLeftY() {
        return -(this.displayHeight * this.originY);
    }

    get topRightX() {
        return -(this.displayWidth * this.originX) + this.displayWidth;
    }
    get topRightY() {
        return this.topLeftY;
    }

    get bottomLeftY() {
        return -(this.displayHeight * this.originY) + this.displayHeight;
    }
    get bottomLeftX() {
        return this.topLeftX;
    }

    get bottomRightX() {
        return this.topRightX;
    }
    get bottomRightY() {
        return this.bottomLeftY;
    }

    get bottomBound() {
        if (this.scrollMode === 0) {
            return this.bottomLeftY;
        } else {
            return this.topRightX;
        }
    }

    get rightBound() {
        if (this.scrollMode === 0) {
            return this.topRightX;
        } else {
            return this.bottomLeftY;
        }
    }

    resize(width?: any, height?: any) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        super.resize(width, height);

        if (this.fixedCellSize) {
            var colCount = Math.floor(this.instWidth / this.table.defaultCellWidth);
            this.table.setColumnCount(colCount);
        } else if (this.expandCellSize) {
            this.table.setDefaultCellWidth(this.instWidth / this.table.colCount);
        }

        this.updateTable(true, true);

        return this;
    }
};

// mixin
Object.assign(
    GridTable.prototype,
    Methods
);

const SCROLLMODE = {
    v: 0,
    vertical: 0,
    h: 1,
    horizontal: 1
};

const MASKUPDATEMODE = {
    update: 0,
    everyTick: 1
};

export default GridTable;