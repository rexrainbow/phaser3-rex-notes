import ContainerLite from '../containerlite/ContainerLite.js';
import Table from './Table.js';
import DefaultMask from '../../utils/mask/DefaultMask.js';
import ResizeGameObject from '../../utils/size/ResizeGameObject.js';
import MaskToGameObject from '../../utils/mask/MaskToGameObject.js';
import Methods from './methods/Methods.js';

const Group = Phaser.GameObjects.Group;
const Components = Phaser.GameObjects.Components;
const Set = Phaser.Structs.Set;
const GetValue = Phaser.Utils.Objects.GetValue;

class GridTable extends ContainerLite {
    constructor(scene, x, y, width, height, config) {
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
        if (reuseCellContainer) {
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

        this.setCellsMask(GetValue(config, 'mask', true));

        this.setScrollMode(GetValue(config, 'scrollMode', 0));
        this.setClampMode(GetValue(config, 'clamplTableOXY', true));

        // Pre-process cell size
        if (this.scrollMode === 0) { // scroll y
            var cellWidth = GetValue(config, 'cellWidth', undefined);
            this.expandCellSize = (cellWidth === undefined);
            if (cellWidth === undefined) {
                var columns = GetValue(config, 'columns', 1);
                config.cellWidth = this.width / columns;
            }
        } else { // scroll x
            // Swap cell width and cell height
            var cellWidth = GetValue(config, 'cellHeight', undefined);
            var cellHeight = GetValue(config, 'cellWidth', undefined);
            this.expandCellSize = (cellWidth === undefined);
            config.cellWidth = cellWidth;
            config.cellHeight = cellHeight;
        }
        this.table = new Table(this, config);

        this.updateTable();
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        if (this.cellsMask) {
            this.scene.game.events.off('poststep', this.maskCells, this);
        }

        this.table.destroy(fromScene);
        this.table = undefined;
        if (this.cellContainersPool) {
            this.cellContainersPool.destroy(true);
            this.cellContainersPool = undefined;
        }
        super.destroy(fromScene);
    }

    setScrollMode(mode) {
        if (typeof (mode) === 'string') {
            mode = SCROLLMODE[mode.toLowerCase()];
        }
        this.scrollMode = mode;
        return this;
    }

    setClampMode(mode) {
        if (mode === undefined) {
            mode = true;
        }
        this.clampTableOXY = mode;
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

    setTableOXY(ox, oy) {
        this.setTableOY(oy).setTableOX(ox);
        return this;
    }

    addTableOY(dy) {
        this.setTableOY(this.tableOY + dy);
        return this;
    }

    addTableOX(dx) {
        this.setTableOX(this.tableOX + dx);
        return this;
    }

    addTableOXY(dx, dy) {
        this.addTableOY(dy).addTableOX(dx);
        return this;
    }

    setTableOYByPercentage(percentage) {
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

    set t(value) {
        this.setTableOYByPercentage(value).updateTable();
    }

    get t() {
        return this.getTableOYPercentage();
    }

    getCell(cellIdx) {
        return this.table.getCell(cellIdx, true);
    }

    getCellContainer(cellIdx) {
        var cell = this.table.getCell(cellIdx, false);
        var container;
        if (cell) {
            container = cell.getContainer();
        }
        return container;
    }

    get cellsCount() {
        return this.table.cellsCount;
    }

    get columnCount() {
        return this.table.colCount;
    }

    setCellHeight(cellIdx, height) {
        var cell;
        if (typeof (cellIdx) === 'number') {
            cell = this.table.getCell(cellIdx, true);
        } else {
            cell = cellIdx;
        }
        cell.height = height; // Only worked when scrollMode is 0
        return this;
    }

    setCellWidth(cellIdx, width) {
        var cell;
        if (typeof (cellIdx) === 'number') {
            cell = this.table.getCell(cellIdx, true);
        } else {
            cell = cellIdx;
        }
        cell.width = width; // Only worked when scrollMode is 1
        return this;
    }

    setCellsMask(config) {
        var maskEnable, maskPadding, maskUpdateMode;
        if (config === true) {
            maskEnable = true;
            maskPadding = 0;
            maskUpdateMode = 0;
        } else if (config === false) {
            maskEnable = false;
        } else {
            maskEnable = GetValue(config, 'mask', true);
            maskPadding = GetValue(config, 'padding', 0);
            maskUpdateMode = GetValue(config, 'updateMode', 0);
        }

        this.maskCellsFlag = true;
        this.maskUpdateMode = maskUpdateMode; // 0,1,undefined
        if (maskEnable) {
            var maskGameObject = new DefaultMask(this, 0, maskPadding);
            this.cellsMask = maskGameObject.createGeometryMask();
            this.add(maskGameObject);
            if (typeof (maskUpdateMode) === 'string') {
                maskUpdateMode = MASKUPDATEMODE[maskUpdateMode];
            }
            this.scene.game.events.on('poststep', this.maskCells, this);
        }

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
        var h;
        var tableHeight = this.tableHeight;
        var instHeight = this.instHeight;
        if (tableHeight > instHeight) {
            h = tableHeight - instHeight;
        } else {
            h = 0;
        }

        return h;
    }

    get tableVisibleWidth() {
        var w;
        var tableWidth = this.tableWidth;
        var instWidth = this.instWidth;
        if (tableWidth > instWidth) {
            w = tableWidth - instWidth;
        } else {
            w = 0;
        }
        return w;
    };

    get bottomLeftY() {
        return -(this.displayHeight * this.originY) + this.displayHeight;
    }

    get topRightX() {
        return -(this.displayWidth * this.originX) + this.displayWidth;
    }

    get topLeftX() {
        return -(this.displayWidth * this.originX);
    }

    get topLeftY() {
        return -(this.displayHeight * this.originY)
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

    resize(width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        super.resize(width, height);
        if (this.cellsMask) {
            ResizeGameObject(MaskToGameObject(this.cellsMask), width, height);
        }

        if (this.expandCellSize) {
            this.table.setDefaultCellWidth(this.instWidth / this.table.colCount);
        }
        this.updateTable(true);
        return this;
    }
};

// mixin
Object.assign(
    GridTable.prototype,
    Components.GetBounds,
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