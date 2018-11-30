import ContainerLite from '../containerlite/ContainerLite.js';
import Table from './Table.js';
import DefaultMask from '../../utils/mask/DefaultMask.js';

const Container = ContainerLite;
const Components = Phaser.GameObjects.Components;
const Set = Phaser.Structs.Set;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class GridTable extends Container {
    constructor(scene, x, y, width, height, config) {
        super(scene, x, y, width, height);
        this.type = 'rexGridTable';
        this.updateFlag = true;
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

        var mask = GetValue(config, 'mask', true);
        if (mask === true) {
            mask = this.getDefaultMask();
        }
        if (mask) {
            this.setMask(mask);
        }

        this.setScrollMode(GetValue(config, 'scrollMode', 0));
        this.setClampMode(GetValue(config, 'clamplTableOXY', true));
        this.table = new Table(this, config);
        this.updateTable();
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }
        this.setCellsCount(0);
        this.table.destroy();
        this.table = undefined;
        super.destroy(fromScene);
    }

    setScrollMode(mode) {
        if (typeof (mode) === 'string') {
            mode = SCROLLMODE[mode.toLowerCase()];
        }
        this.scrollMode = mode;
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
        this.updateFlag = true;
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
        if (cellIdx <= this.lastVisibleCellIdx) {
            this.updateFlag = true;
        }
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
                        this.updateFlag = true;
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
            } else {
                if (tableOYExeceedBottom)
                    oy = bottomTableOY;
            }
        }

        if (this._tableOY !== oy) {
            this.updateFlag = true;
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
    }

    set tableOX(ox) {
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
            this.updateFlag = true;
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
    }

    setTableOY(oy) {
        this.tableOY = oy;
        return this;
    }

    setTableOX(ox) {
        this.tableOX = ox;
        return this;
    }

    setTableOXY(ox, oy) {
        this.tableOX = ox;
        this.tableOY = oy;
        return this;
    }

    addTableOX(dx) {
        this.tableOX += dx;
        return this;
    }

    addTableOY(dy) {
        this.tableOY += dy;
        return this;
    }

    addTableOXY(dx, dy) {
        this.tableOX += dx;
        this.tableOY += dy;
        return this;
    }

    setTableOYByPercentage(percentage) {
        percentage = Clamp(percentage, 0, 1);
        this.setTableOY(-this.tableVisibleHeight * percentage);
        return this;
    }

    getTableOYPercentage() {
        return (this.tableOY / -this.tableVisibleHeight);
    }

    set t(value) {
        this.setTableOYByPercentage(value).updateTable();
    }

    get t() {
        return this.getTableOYPercentage();
    }

    updateTable(refresh) {
        if (refresh) {
            this.updateFlag = true;
        }
        if (!this.updateFlag) {
            return this;
        }

        this.updateFlag = false;
        if (refresh) {
            this.clearVisibleCellIndexes();
            this.hideCells();
        }
        this.clearVisibleCellIndexes();
        this.showCells();
        this.hideCells();
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
        if (typeof (cellIdx) === 'number') {
            var cell = this.table.getCell(cellIdx, true);
            cell.height = height;
        }
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

    // internal
    getDefaultMask() {
        var shape = new DefaultMask(this);
        this.add(shape);
        var mask = shape.createGeometryMask();
        return mask;
    }

    resize(width, height) {
        super.resize(width, height);
        this.updateTable(true);

        if (this.mask) {
            var gameObject = (this.mask.hasOwnProperty('geometryMask')) ? this.mask.geometryMask : this.mask.bitmapMask;
            if (gameObject.resize) {
                gameObject.resize(width, height);
            } else {
                gameObject.displayWidth = width;
                gameObject.displayHeight = height;
            }
        }
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
        // attach container to cell by cell.setContainer(container) under this event
        this.emit('cellvisible', cell);
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
        // option: pop container of cell by cell.popContainer() under this event 
        this.emit('cellinvisible', cell);
        cell.destroyContainer(); // destroy container of cell
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
            w = tableWidth;
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