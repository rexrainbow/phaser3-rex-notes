import ArrayFill from '../../../plugins/utils/array/Fill.js';

export default {
    setColumnSpace(columnSpace) {
        if (!this.space.column) {
            this.space.column = [];
        }

        this.space.column.length = this.columnCount - 1;
        if (typeof (columnSpace) === 'number') {
            ArrayFill(this.space.column, columnSpace);
        } else {
            for (var i = 0, cnt = this.columnCount - 1; i < cnt; i++) {
                this.space.column[i] = columnSpace[i] || 0;
            }
        }
        return this;
    },

    setRowSpace(rowSpace) {
        if (!this.space.row) {
            this.space.row = [];
        }

        this.space.row.length = this.rowCount - 1;
        if (typeof (rowSpace) === 'number') {
            ArrayFill(this.space.row, rowSpace);
        } else {
            for (var i = 0, cnt = this.rowCount - 1; i < cnt; i++) {
                this.space.row[i] = rowSpace[i] || 0;
            }
        }

        return this;
    },

    setIndentLeft(odd, even) {
        this.space.indentLeftOdd = odd;
        this.space.indentLeftEven = even;
        return this;
    },

    setIndentTop(odd, even) {
        this.space.indentTopOdd = odd;
        this.space.indentTopEven = even;
        return this;
    }
}