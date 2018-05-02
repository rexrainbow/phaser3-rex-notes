import TableKlass from './Table.js';
import Clean from './../utils/object/Clean.js';

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

        if (width === undefined) {
            width = 0;
        }
        if (height === undefined) {
            height = 0;
        }
        this.setSize(width, height);
        this.setScrollMode(GetValue(config, 'scrollMode', 0));
        this.table = new TableKlass(this, config);

        var callback = GetValue(config, 'cellVisibleCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'cellVisibleCallbackScope', undefined);
            this.on('cellvisible', callback, scope);
        }
        this.updateTable();
    }

    get tableOX() {
        return this._tableOX;
    }

    get tableOY() {
        return this._tableOY;
    }

    set tableOX(ox) {

    }

    set tableOY(oy) {

    }

    setTableOX(ox) {
        this.tableOY = ox;
        return this;
    }
    setTableOY(oy) {
        this.tableOY = oy;
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

    addObjectToCell(cellIdx, gameobject) {
        if (!this.visibleCellIdx.hasOwnProperty(cellIdx)) {
            return this;
        }

        var table = this.table;
        var cell = table.getCell(cellIdx, true);
        if (!cell) {
            return this;
        }
        cell.addObject(gameobject);
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

                if (!this.preVisibleCellIdx.hasOwnProperty(cellIdx)) {
                    this.showCell(cellIdx, cellTLX, cellTLY);
                }
                table.getCell(cellIdx).setTLXY(cellTLX, cellTLY);
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

    showCell(idx, tlx, tly) {
        this.emit('cellvisible', this, idx);
    }

    hideCells() {
        var preList = this.preVisibleCellIdx;
        var curList = this.visibleCellIdx;
        for (var idx in preList) {
            if (!curList.hasOwnProperty(idx)) {
                this.hideCell(idx);
            }
        }
    }

    hideCell(idx) {
        this.emit('cellinvisible', idx);
    }

    setScrollMode(mode) {
        if (typeof (mode) === 'string') {
            mode = SCROLLMODE[mode.toLowerCase()];
        }
        this.scrollMode = mode;
    }

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
    'v': 0,
    'vertical': 0,
    'h': 1,
    'horizontal': 1
};

Phaser.GameObjects.GameObjectFactory.register('rexGridTable', function (x, y, width, height, config) {
    return this.displayList.add(new GridTable(this.scene, x, y, width, height, config));
});

export default GridTable;