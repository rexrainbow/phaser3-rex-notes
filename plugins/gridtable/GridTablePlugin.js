import TableKlass from './Table.js';
import Clean from './../utils/object/Clean.js';
import IsArray from './../utils/array/IsArray.js';

const Container = Phaser.GameObjects.Container;
const Components = Phaser.GameObjects.Components;
const GetValue = Phaser.Utils.Objects.GetValue;

class GridTable extends Container {
    constructor(scene, x, y, width, height, config) {
        super(scene, x, y);
        this.type = 'GridTable';
        this.updateFlag = true;
        this._tableOX = 0;
        this._tableOY = 0;
        this.visibleCellIdx = {};
        this.preVisibleCellIdx = {};
        this.visibleStartX = null;
        this.visibleEndX = null;
        this.visibleStartY = null;
        this.visibleEndY = null;
        this.execeedTopState = false;
        this.execeedBottomState = false;
        this.execeedLeftState = false;
        this.execeedRightState = false;        

        if (width === undefined) {
            width = 0;
        }
        if (height === undefined) {
            height = 0;
        }
        this.setSize(width, height);
        this.setScrollMode(GetValue(config, 'scrollMode', 0));
        this.setClampMode(GetValue(config, 'clamplTableOY', true));
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
        this.table = new TableKlass(this, config);
        this.updateTable();
    }

    setScrollMode(mode) {
        if (typeof (mode) === 'string') {
            mode = SCROLLMODE[mode.toLowerCase()];
        }
        this.scrollMode = mode;
    }

    setClampMode(mode) {
        this.clampTableOXYMode = mode;
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
                var tableVisibleHeight = this.tableVisibleHeight;
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
                var tableVisibleWidth = this.tableVisibleWidth;
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

    addTableOXY(dx, dy){
        this.tableOX += dx;
        this.tableOY += dy;
        return this;
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
            this.cleanVisibleCellIndexes();
            this.hideCells();
        }
        this.cleanVisibleCellIndexes();
        this.showCells();
        this.hideCells();
        return this;
    }

    getCell(cellIdx) {
        return this.table.getCell(cellIdx, true);
    }

    cleanVisibleCellIndexes() {
        var tmp = this.preVisibleCellIdx;
        this.preVisibleCellIdx = this.visibleCellIdx;
        this.visibleCellIdx = tmp;
        Clean(this.visibleCellIdx);
    }

    showCells() {
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
        var lastIdx = table.cellCount - 1;
        var lastColIdx = table.colCount - 1;

        var cellTLX0 = this.getTLX(colIdx),
            cellTLX = cellTLX0;
        var cellTLY = this.getTLY(rowIdx);
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

                if (this.visibleEndY < rowIdx) {
                    this.visibleEndY = rowIdx;
                }

                if (this.visibleEndX < colIdx) {
                    this.visibleEndX = colIdx;
                }

                this.visibleCellIdx[cellIdx] = true;

                var cell = table.getCell(cellIdx, true);
                if (!this.preVisibleCellIdx.hasOwnProperty(cellIdx)) {
                    this.showCell(cell);
                }
                cell.setXY(cellTLX, cellTLY);
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
        var preList = this.preVisibleCellIdx;
        var curList = this.visibleCellIdx;
        var cell;
        for (var idx in preList) {
            if (!curList.hasOwnProperty(idx)) {
                cell = this.table.getCell(idx, false);
                this.hideCell(cell);
            }
        }
    }

    hideCell(cell) {
        // option: pop container of cell by cell.popContainer() under this event 
        this.emit('cellinvisible', cell);        
        cell.destroyContainer();  // destroy container of cell
    }

    get instHeight() {
        return (this.scrollMode === 0) ? this.height : this.width;
    }

    get instWidth() {
        return (this.scrollMode === 0) ? this.width : this.height;
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
        var totalRowsHeight = this.table.totalRowsHeight;
        var instHeight = this.instHeight;
        if (totalRowsHeight > instHeight) {
            h = totalRowsHeight - instHeight;
        } else {
            h = 0;
        }

        return h;
    }

    get tableVisibleWidth() {
        var w;
        var totalColumnWidth = this.table.totalColumnWidth;
        var instWidth = this.instWidth;
        if (totalColumnWidth > instWidth) {
            w = totalColumnWidth - instWidth;
        } else {
            w = totalColumnWidth;
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

Phaser.GameObjects.GameObjectFactory.register('rexGridTable', function (x, y, width, height, config) {
    return this.displayList.add(new GridTable(this.scene, x, y, width, height, config));
});

Phaser.GameObjects.GameObjectCreator.register('rexGridTable', function (config) {
    var width = GetValue(config, 'width', 256);
    var height = GetValue(config, 'height', 256);
    var table = new GridTable(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, table, config);
    return table;
});

export default GridTable;