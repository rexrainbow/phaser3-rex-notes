import ContainerLite from '../containerlite/ContainerLite.js';
import Table from './Table.js';
import DefaultMask from '../../utils/mask/DefaultMask.js';
import ResizeGameObject from '../../utils/size/ResizeGameObject.js';
import MaskToGameObject from '../../utils/mask/MaskToGameObject.js';
import MaskChildren from '../containerlite/MaskChildren.js';

const Container = ContainerLite;
const Components = Phaser.GameObjects.Components;
const Set = Phaser.Structs.Set;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class GridTable extends Container {
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
        this.visibleStartX = null;
        this.visibleEndX = null;
        this.visibleStartY = null;
        this.visibleEndY = null;
        this.lastVisibleCellIdx = null;
        this.execeedTopState = false;
        this.execeedBottomState = false;
        this.execeedLeftState = false;
        this.execeedRightState = false;

        var reuseCellContainer = GetValue(config, 'reuseCellContainer', false);
        this.cellContainersPool = (reuseCellContainer) ? scene.add.group() : undefined;

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

        this.cellsMask = undefined;
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

        if (!fromScene) {
            // Recycle cell containers
            this.setCellsCount(0);
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
        this.clampTableOXYMode = mode;
        return this;
    }

    setCellsCount(count) {
        var cellsCount = this.cellsCount;
        if (cellsCount === count) {
            return this;
        }

        if (cellsCount > count) {
            this.removeCell(count, cellsCount - count);
        } else { // cellsCount < count
            this.insertNewCell(cellsCount, count - cellsCount);
        }
        return this;
    }

    setColumnCount(count) {
        if (this.table.colCount === count) {
            return this;
        }
        this.table.setColumnCount(count);
        return this;
    }

    setGridSize(colCount, rowCount) {
        this.setCellsCount(colCount * rowCount);
        this.table.setColumnCount(colCount);
        return this;
    }

    insertNewCell(cellIdx, count) {
        if (typeof (cellIdx) === 'object') {
            cellIdx = cellIdx.index;
        }
        if (count === undefined) {
            count = 1;
        }
        if (count <= 0) {
            return this;
        }
        cellIdx = Clamp(cellIdx, 0, this.cellsCount);
        this.table.insertNewCell(cellIdx, count);
        return this;
    }

    removeCell(cellIdx, count) {
        if (typeof (cellIdx) === 'object') {
            cellIdx = cellIdx.index;
        }
        if (count === undefined) {
            count = 1;
        }
        if (cellIdx < 0) {
            count += cellIdx;
            cellIdx = 0;
        }
        if (count <= 0) {
            return this;
        }
        // out-of-range
        if (cellIdx > this.cellsCount) {
            return this;
        }

        if (cellIdx <= this.lastVisibleCellIdx) {
            var preList = this.preVisibleCells;
            var curList = this.visibleCells;
            var cell;
            for (var i = cellIdx, endIdx = cellIdx + count; i < endIdx; i++) {
                cell = this.getCell(i, false);
                if (cell) {
                    if (curList.contains(cell)) {
                        this.hideCell(cell);
                        curList.delete(cell);
                    }
                    preList.delete(cell);
                }
            }
        }

        this.table.removeCell(cellIdx, count);
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

    setTableOY(oy) {
        var table = this.table;
        var topTableOY = this.topTableOY;
        var bottomTableOY = this.bottomTableOY;
        var tableOYExceedTop = this.tableOYExceedTop(oy);
        var tableOYExeceedBottom = this.tableOYExeceedBottom(oy);
        if (this.clampTableOXYMode) {
            var rowCount = table.rowCount;
            var visibleRowCount = table.heightToRowIndex(this.instHeight, true);

            // less then 1 page            
            if (rowCount < visibleRowCount) {
                oy = 0;
            } else if (tableOYExceedTop) {
                oy = topTableOY
            } else if (tableOYExeceedBottom) {
                oy = bottomTableOY;
            }
        }

        if (this._tableOY !== oy) {
            this._tableOY = oy;
        }


        if (tableOYExceedTop) {
            if (!this.execeedTopState) {
                this.emit('execeedtop', this, oy, topTableOY);
            }
        }
        this.execeedTopState = tableOYExceedTop;

        if (tableOYExeceedBottom) {
            if (!this.execeedBottomState) {
                this.emit('execeedbottom', this, oy, bottomTableOY);
            }
        }
        this.execeedBottomState = tableOYExeceedBottom;
        return this;
    }

    setTableOX(ox) {
        var table = this.table;
        var leftTableOX = this.leftTableOX;
        var rightTableOX = this.rightTableOX;
        var tableOXExeceedLeft = this.tableOXExeceedLeft(ox);
        var tableOXExeceedRight = this.tableOXExeceedRight(ox);
        if (this.clampTableOXYMode) {
            var colCount = table.colCount;
            var visibleColCount = table.widthToColIndex(this.instWidth, true);

            // less then 1 page            
            if (colCount < visibleColCount) {
                ox = 0;
            } else if (tableOXExeceedLeft) {
                ox = leftTableOX
            } else {
                // var tableVisibleWidth = this.tableVisibleWidth;
                if (tableOXExeceedRight)
                    ox = rightTableOX;
            }
        }

        if (this._tableOX !== ox) {
            this._tableOX = ox;
        }


        if (tableOXExeceedLeft) {
            if (!this.execeedLeftState) {
                this.emit('execeedleft', this, ox, leftTableOX);
            }
        }
        this.execeedLeftState = tableOXExeceedLeft;

        if (tableOXExeceedRight) {
            if (!this.execeedRightState) {
                this.emit('execeedright', this, ox, rightTableOX);
            }
        }
        this.execeedRightState = tableOXExeceedRight;
        return this;
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

    updateTable(refresh) {
        if (refresh === undefined) {
            refresh = false;
        }
        if (refresh) {
            this.clearVisibleCellIndexes();
            this.hideCells();
        }
        this.clearVisibleCellIndexes();
        this.showCells();
        this.hideCells();
        this.maskCells();
        return this;
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

    pointerToCellIndex(x, y) {
        y -= (this.y + this.topLeftY);
        x -= (this.x + this.topLeftX);
        var offsetTableOY = this.tableOY - ((this.scrollMode === 0) ? y : x);
        var offsetTableOX = this.tableOX - ((this.scrollMode === 0) ? x : y);

        var table = this.table;
        var rowIdx = table.heightToRowIndex(-offsetTableOY);
        var colIdx = table.widthToColIndex(-offsetTableOX);
        var cellIdx = table.colRowToCellIndex(colIdx, rowIdx);
        if (cellIdx === null) {
            return null;
        }
        if (!this.cellIsVisible(cellIdx)) {
            return null;
        }
        return cellIdx;
    }

    pointerToCellContainer(x, y) {
        var cellIdx = this.pointerToCellIndex(x, y);
        if (cellIdx === null) {
            return undefined;
        }
        return this.getCellContainer(cellIdx);
    }

    cellIsVisible(cellIdx) {
        var cell = this.table.getCell(cellIdx, false);
        return cell && this.visibleCells.contains(cell);
    }

    // For when you know this Set will be modified during the iteration
    eachVisibleCell(callback, scope) {
        this.visibleCells.each(callback, scope);
        return this;
    }

    // For when you absolutely know this Set won't be modified during the iteration
    iterateVisibleCell(callback, scope) {
        this.visibleCells.iterate(callback, scope);
        return this;
    }

    // Internal
    setCellsMask(maskConfig) {
        var maskEnable, maskPadding;
        if (maskConfig === true) {
            maskEnable = true;
            maskPadding = 0;
        } else if (maskConfig === false) {
            maskEnable = false;
        } else {
            maskEnable = GetValue(maskConfig, 'mask', true);
            maskPadding = GetValue(maskConfig, 'padding', 0);
        }
        if (maskEnable) {
            var maskGameObject = new DefaultMask(this, 0, maskPadding);
            this.cellsMask = maskGameObject.createGeometryMask();
            this.add(maskGameObject);
        }

        return this;
    }

    maskCells() {
        var children = [];
        var cells = this.visibleCells.entries, container;
        for (var i = 0, cnt = cells.length; i < cnt; i++) {
            container = cells[i].getContainer();
            if (container) {
                if (container.isRexContainerLite) { // ContainerLite
                    container.getAllChildren(children);
                } else { // Others
                    children.push(container);
                }
            }
        }
        MaskChildren(this, this.cellsMask, children);
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

    clearVisibleCellIndexes() {
        var tmp = this.preVisibleCells;
        this.preVisibleCells = this.visibleCells;
        this.visibleCells = tmp;
        this.visibleCells.clear();
    }

    showCells() {
        if (this.cellsCount === 0) {
            return;
        }
        var table = this.table;
        var rowIdx = table.heightToRowIndex(-this.tableOY);
        if (rowIdx < 0) {
            rowIdx = 0;
        }

        var colIdx = table.widthToColIndex(-this.tableOX);
        if (colIdx < 0) {
            colIdx = 0;
        }

        var cellIdx = table.colRowToCellIndex(colIdx, rowIdx);
        var bottomBound = this.bottomBound;
        var rightBound = this.rightBound;
        var lastIdx = table.cellsCount - 1;
        var lastColIdx = table.colCount - 1;

        var cellTLX0 = this.getTLX(colIdx),
            cellTLX = cellTLX0;
        var cellTLY = this.getTLY(rowIdx);
        this.visibleStartY = null;
        this.visibleEndY = null;
        this.visibleStartX = null;
        this.visibleEndX = null;
        this.lastVisibleCellIdx = null;
        while ((cellTLY < bottomBound) && (cellIdx <= lastIdx)) {
            if (this.table.isValidCellIdx(cellIdx)) {
                if (this.visibleStartY === null) {
                    this.visibleStartY = rowIdx;
                    this.visibleEndY = rowIdx;
                }
                if (this.visibleStartX === null) {
                    this.visibleStartX = colIdx;
                    this.visibleEndX = colIdx;
                }

                if (this.lastVisibleCellIdx === null) {
                    this.lastVisibleCellIdx = cellIdx;
                }

                if (this.visibleEndY < rowIdx) {
                    this.visibleEndY = rowIdx;
                }

                if (this.visibleEndX < colIdx) {
                    this.visibleEndX = colIdx;
                }

                if (this.lastVisibleCellIdx < cellIdx) {
                    this.lastVisibleCellIdx = cellIdx;
                }

                var cell = table.getCell(cellIdx, true);
                this.visibleCells.set(cell);
                if (!this.preVisibleCells.contains(cell)) {
                    this.showCell(cell);
                }
                if (this.scrollMode === 0) {
                    cell.setXY(cellTLX, cellTLY);
                } else {
                    cell.setXY(cellTLY, cellTLX);
                }
            }

            if ((cellTLX < rightBound) && (colIdx < lastColIdx)) {
                cellTLX += table.getColWidth(colIdx);
                colIdx += 1;
            } else {
                cellTLX = cellTLX0;
                cellTLY += table.getRowHeight(rowIdx);

                colIdx = this.visibleStartX;
                rowIdx += 1;
            }

            cellIdx = table.colRowToCellIndex(colIdx, rowIdx);
        }
    }

    showCell(cell) {
        // Attach container to cell by cell.setContainer(container) under this event
        var reusedCellContainer = null;
        if (this.cellContainersPool) {
            reusedCellContainer = this.cellContainersPool.getFirstDead();
            if (reusedCellContainer !== null) { // Reuse this game object
                reusedCellContainer.setActive(true).setVisible(true);
            }
        }

        this.emit('cellvisible', cell, reusedCellContainer);

        if (this.cellContainersPool) {
            var cellContainer = cell.getContainer();
            if (cellContainer) {
                if (reusedCellContainer === null) {
                    this.cellContainersPool.add(cellContainer); // New cell container, add to pool
                } else if (reusedCellContainer !== cellContainer) {
                    // Why reusedCellContainer is not equal to cellContainer?
                    this.cellContainersPool.add(cellContainer); // New cell container, add to pool
                    this.cellContainersPool.killAndHide(reusedCellContainer); // Unused cell container, put back to pool
                }
            } else { // No cell container added
                if (reusedCellContainer !== null) {
                    this.cellContainersPool.killAndHide(reusedCellContainer); // Unused cell container, put back to pool
                }
            }
        }
    }

    hideCells() {
        var preList = this.preVisibleCells;
        var curList = this.visibleCells;
        preList.iterate(function (cell) {
            if (!curList.contains(cell)) {
                this.hideCell(cell);
            }
        }, this);
    }

    hideCell(cell) {
        // Option: pop container of cell by cell.popContainer() under this event 
        this.emit('cellinvisible', cell);

        if (this.cellContainersPool) {
            var cellContainer = cell.popContainer(); // null if already been removed
            if (cellContainer) {
                this.cellContainersPool.killAndHide(cellContainer);
            }
        }

        cell.destroyContainer(); // Destroy container of cell
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

    tableOYExceedTop(oy) {
        if (oy === undefined) {
            oy = this.tableOY;
        }
        return (oy > this.topTableOY);
    }

    tableOYExeceedBottom(oy) {
        if (oy === undefined) {
            oy = this.tableOY;
        }
        return (oy < this.bottomTableOY);
    }

    tableOXExeceedLeft(ox) {
        if (ox === undefined) {
            ox = this.tableOX;
        }
        return (ox > this.leftTableOX);
    }

    tableOXExeceedRight(ox) {
        if (ox === undefined) {
            ox = this.tableOX;
        }
        return (ox < this.rightTableOX);
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

    getTLX(colIdx) {
        var ox = (this.scrollMode === 0) ? this.topLeftX : this.topLeftY;
        var x = this.tableOX + this.table.colIndexToWidth(0, colIdx - 1) + ox;
        return x;
    }

    getTLY(rowIdx) {
        var oy = (this.scrollMode === 0) ? this.topLeftY : this.topLeftX;
        var y = this.tableOY + this.table.rowIndexToHeight(0, rowIdx - 1) + oy;
        return y;
    }
};

// mixin
Object.assign(
    GridTable.prototype,
    Components.GetBounds
);

const SCROLLMODE = {
    v: 0,
    vertical: 0,
    h: 1,
    horizontal: 1
};

var P0 = {}; // reuse point object

export default GridTable;