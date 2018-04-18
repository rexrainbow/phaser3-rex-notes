'use strict'

import CSVToArray from './../csvtoarray.js';
import ArrCopy from './../utils/array/Copy.js';
import TypeConvert from './../utils/string/TypeConvert.js';
import IsArray from './../utils/array/IsArray.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class CsvToHashTable {
    constructor(parent, config) {
        this.resetFromJSON(config);
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.table = GetFastValue(o, 'table', {}); // 2d hash table
        this.colKeys = GetFastValue(o, 'col', []);
        this.rowKeys = GetFastValue(o, 'row', []);
        this.cursor = GetFastValue(o, 'cursor', {});
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            table: this.table,
            col: this.colKeys,
            row: this.rowKeys,
            cursor: this.cursor
        };
    }

    shutdown() {}

    destroy() {}

    loadCSV(csvString, strDelimiter) {
        this.clean();
        var arr = CSVToArray(csvString, strDelimiter);

        var table = this.table;
        this.colKeys = ArrCopy(this.colKeys, arr[0]);
        this.rowKeys.length = arr.length - 1;
        for (var i = 0, len = this.rowKeys.length; i < len; i++) {
            this.rowKeys[i] = arr[i + 1][0];
        }

        var colKey, rowKey, col,
            colKeys = this.colKeys,
            rowKeys = this.rowKeys;
        for (var c = 0, clen = colKeys.length; c < clen; c++) {
            colKey = colKeys[c];
            col = {};
            table[colKey] = col;
            for (var r = 0, rlen = rowKeys.length; r < rlen; r++) {
                rowKey = rowKeys[r];
                col[rowKey] = arr[r + 1][c + 1];
            }
        }

        this.setCursor('', '');

        return this;
    }

    clean() {
        var table = this.table;
        for (var key in table) {
            delete table[key];
        }
        this.colKeys.length = 0;
        this.rowKeys.length = 0;
        return this;
    };

    get(colKey, rowKey) {
        var value = undefined;
        var table = this.table;
        if (table.hasOwnProperty(colKey)) {
            var col = table[colKey];
            if (col.hasOwnProperty(rowKey)) {
                value = col[rowKey];
            }
        }

        this.setCursor(colKey, rowKey);
        return value;
    }

    set(colKey, rowKey, value) {
        var table = this.table;
        if (table.hasOwnProperty(colKey)) {
            var col = table[colKey];
            if (col.hasOwnProperty(rowKey)) {
                col[rowKey] = value;
            }
        }

        this.setCursor(colKey, rowKey);
        return this;
    }

    add(colKey, rowKey, value) {
        var table = this.table;
        if (table.hasOwnProperty(colKey)) {
            var col = table[colKey];
            if (col.hasOwnProperty(rowKey)) {
                col[rowKey] += value;
            }
        }

        this.setCursor(colKey, rowKey);
        return this;
    }

    hasColKey(colKey) {
        return (this.colKeys.indexOf(colKey) !== -1);
    }

    hasRowKey(rowKey) {
        return (this.rowKeys.indexOf(rowKey) !== -1);
    }

    hasKey(colKey, rowKey) {
        return this.hasColKey(colKey) && this.hasRowKey(rowKey);
    }

    isValueInCol(colKey, data) {
        if (!this.hasColKey(colKey)) {
            return false;
        }
        var col = this.table[colKey];
        var rowKey, rowKeys = this.rowKeys;
        for (var i = 0, len = rowKeys.length; i < len; i++) {
            rowKey = rowKeys[i];
            if (col[rowKey] === data) {
                return true;
            }
        }

        return false;
    }

    isValueInRol(rowKey, data) {
        if (!this.hasRowKey(rowKey)) {
            return false;
        }

        var table = this.table;
        var colKey, colKeys = this.colKeys;
        for (var i = 0, len = colKeys.length; i < len; i++) {
            colKey = colKeys[i];
            if (table[colKey][rowKey] === data) {
                return true;
            }
        }

        return false;
    }

    appendCol(colKey, callback, scope) {
        if (this.hasColKey(colKey)) {
            return this;
        }
        this.colKeys.push(colKey);

        var col = {};
        this.table[colKey] = col;
        var rowKeys = this.rowKeys,
            rowKey;

        if (typeof (callback) === 'function') {
            if (scope) {
                for (var i = 0, len = rowKeys.length; i < len; i++) {
                    rowKey = rowKeys[i];
                    col[rowKey] = callback.call(scope, this, colKey, rowKey);
                }
            } else {
                for (var i = 0, len = rowKeys.length; i < len; i++) {
                    rowKey = rowKeys[i];
                    col[rowKey] = callback(this, colKey, rowKey);
                }
            }
        } else {
            var initValue = callback;
            for (var i = 0, len = rowKeys.length; i < len; i++) {
                col[rowKey] = initValue;
            }
        }
        return this;
    }

    appendRow(rowKey, callback, scope) {
        if (this.hasRowKey(rowKey)) {
            return this;
        }
        this.rowKeys.push(rowKey);

        var table = this.table;
        var colKeys = this.colKeys,
            colKey, col;

        var isCallbackMode = (typeof (callback) === 'function');
        var initValue = (isCallbackMode) ? undefined : callback;

        if (typeof (callback) === 'function') {
            if (scope) {
                for (var i = 0, len = colKeys.length; i < len; i++) {
                    colKey = colKeys[i];
                    col = table[colKey];
                    col[rowKey] = callback.call(scope, this, colKey, rowKey);
                }
            } else {
                for (var i = 0, len = colKeys.length; i < len; i++) {
                    colKey = colKeys[i];
                    col = table[colKey];
                    col[rowKey] = callback(this, colKey, rowKey);
                }
            }
        } else {
            var initValue = callback;
            for (var i = 0, len = colKeys.length; i < len; i++) {
                colKey = colKeys[i];
                col = table[colKey];
                col[rowKey] = initValue;
            }
        }
        return this;
    }

    removeCol(colKey) {
        var idx = this.colKeys.indexOf(colKey);
        if (idx === -1) {
            return this;
        }
        this.colKeys.splice(idx, 1);
        delete this.table[colKey];
        return this;
    }

    removeRol(rowKey) {
        var idx = this.rowKeys.indexOf(rowKey);
        if (idx === -1) {
            return this;
        }
        this.rowKeys.splice(idx, 1);

        var table = this.table;
        var colKeys = this.colKeys,
            colKey, col;
        for (var i = 0, len = colKeys.length; i < len; i++) {
            colKey = colKeys[i];
            col = table[colKey];
            delete col[rowKey];
        }
        return this;
    }

    eachCol(rowKey, callback, scope) {
        var colKeys = this.colKeys,
            colKey, value;
        var isValidRowKey = this.hasRowKey(rowKey);

        if (scope) {
            for (var i = 0, len = colKeys.length; i < len; i++) {
                colKey = colKeys[i];
                if (isValidRowKey) {
                    value = this.get(colKey, rowKey);
                }
                callback.call(scope, this, colKey, rowKey, value);
            }
        } else {
            for (var i = 0, len = colKeys.length; i < len; i++) {
                colKey = colKeys[i];
                if (isValidRowKey) {
                    value = this.get(colKey, rowKey);
                }
                callback(scope, this, colKey, rowKey, value);
            }
        }
        return this;
    }

    eachRow(colKey, callback, scope) {
        var rowKeys = this.rowKeys,
            rowKey, value;
        var isValidColKey = this.hasColKey(colKey);
        if (scope) {
            for (var i = 0, len = rowKeys.length; i < len; i++) {
                rowKey = rowKeys[i];
                if (isValidColKey) {
                    value = this.get(colKey, rowKey);
                }
                callback.call(scope, this, colKey, rowKey, value);
            }
        } else {
            for (var i = 0, len = rowKeys.length; i < len; i++) {
                rowKey = rowKeys[i];
                if (isValidColKey) {
                    value = this.get(colKey, rowKey);
                }
                callback(this, colKey, rowKey, value);
            }
        }

        return this;
    }

    convert(callback, scope) {
        if (callback === undefined) {
            callback = defaultTypeConvert;
        }

        var table = this.table;
        var colKey, rowKey, col, value,
            colKeys = this.colKeys,
            rowKeys = this.rowKeys;
        if (scope) {
            for (var c = 0, clen = colKeys.length; c < clen; c++) {
                colKey = colKeys[c];
                col = table[colKey];
                for (var r = 0, rlen = rowKeys.length; r < rlen; r++) {
                    rowKey = rowKeys[r];
                    value = col[rowKey];
                    col[rowKey] = callback.call(scope, this, colKey, rowKey, value);
                }
            }
        } else {
            for (var c = 0, clen = colKeys.length; c < clen; c++) {
                colKey = colKeys[c];
                col = table[colKey];
                for (var r = 0, rlen = rowKeys.length; r < rlen; r++) {
                    rowKey = rowKeys[r];
                    value = col[rowKey];
                    col[rowKey] = callback(this, colKey, rowKey, value);
                }
            }
        }

        return this;
    }

    convertCol(colKey, callback, scope) {
        if (callback === undefined) {
            callback = defaultTypeConvert;
        }

        if (IsArray(colKey)) {
            for (var i = 0, len = colKey.length; i < len; i++) {
                this.convertCol(colKey[i], callback, scope);
            }
            return this;
        }

        if (!this.hasColKey(colKey)) {
            return this;
        }

        var col = this.table[colKey];
        var rowKey, rowKeys = this.rowKeys,
            value;
        if (scope) {
            for (var r = 0, rlen = rowKeys.length; r < rlen; r++) {
                rowKey = rowKeys[r];
                value = col[rowKey];
                col[rowKey] = callback.call(scope, this, colKey, rowKey, value);
            }
        } else {
            for (var r = 0, rlen = rowKeys.length; r < rlen; r++) {
                rowKey = rowKeys[r];
                value = col[rowKey];
                col[rowKey] = callback(this, colKey, rowKey, value);
            }
        }
        return this;
    }

    convertRow(rowKey, callback, scope) {
        if (callback === undefined) {
            callback = defaultTypeConvert;
        }

        if (IsArray(rowKey)) {
            for (var i = 0, len = rowKey.length; i < len; i++) {
                this.convertRow(rowKey[i], callback, scope);
            }
            return this;
        }

        var table = this.table;
        var colKey, colKeys = this.colKeys,
            value;
        if (scope) {
            for (var c = 0, clen = colKeys.length; c < clen; c++) {
                colKey = colKeys[c];
                value = table[colKey][rowKey];
                table[colKey][rowKey] = callback.call(scope, this, colKey, rowKey, value);
            }
        } else {
            for (var c = 0, clen = colKeys.length; c < clen; c++) {
                colKey = colKeys[c];
                value = table[colKey][rowKey];
                table[colKey][rowKey] = callback(this, colKey, rowKey, value);
            }
        }
        return this;

    }

    get curColKey() {
        return this.cursor.colKey;
    }

    get curRowKey() {
        return this.cursor.rowKey;
    }

    nextColKey(colKey, step) {
        if (colKey === undefined) {
            colKey = this.cursor.colKey;
        }
        if (step === undefined) {
            step = 1;
        }

        var colKeys = this.colKeys;
        var idx = colKeys.indexOf(colKey);
        if (idx === -1) {
            return undefined;
        }
        return colKeys[idx + step];
    }

    nextRowKey(rowKey, step) {
        if (rowKey === undefined) {
            rowKey = this.cursor.rowKey;
        }
        if (step === undefined) {
            step = 1;
        }

        var rowKeys = this.rowKeys;
        var idx = rowKeys.indexOf(rowKey);
        if (idx === -1) {
            return undefined;
        }
        return rowKeys[idx + 1];
    }

    previousColKey(colKey, step) {
        if (step === undefined) {
            step = 1;
        }
        step = -step;
        return this.nextColKey(colKey, step);
    }

    previousRowKey(rowKey, step) {
        if (step === undefined) {
            step = 1;
        }
        step = -step;
        return this.nextRowlKey(rowKey, step);
    }

    sortCol(callback, scope) {
        if (typeof (callback) === 'function') {
            if (scope) {
                callback = callback.bind(scope);
            }
        } else {
            var colKey = callback;
            var mode = sceop;
            if (typeof (mode) === 'string') {
                mode = SORTMODE[mode];
            }
            if (!this.hasRowKey(rowKey)) {
                return this;
            }
            var table = this;
            callback = function (rowKeyA, rowKeyB) {
                var valA = table.get(rowKeyA, rowKey);
                var valB = table.get(rowKeyB, rowKey);
                var retVal;
                if (mode >= 2) {
                    valA = parseFloat(valA);
                    valB = parseFloat(valB);
                }
                switch (mode) {
                    case 0:
                    case 2:
                        retVal = (valA > valB) ? 1 :
                            (valA < valB) ? -1 : 0;
                        break;

                    case 1:
                    case 3:
                        retVal = (valA < valB) ? 1 :
                            (valA > valB) ? -1 : 0;
                        break;
                }
                return retVal;
            }
        }

        this.rowKeys.sort(callback);
        return this;
    }

    sortRow(callback, scope) {
        if (typeof (callback) === 'function') {
            if (scope) {
                callback = callback.bind(scope);
            }
        } else {
            var rowKey = callback;
            var mode = sceop;
            if (typeof (mode) === 'string') {
                mode = SORTMODE[mode];
            }
            if (!this.hasRowKey(rowKey)) {
                return this;
            }
            var table = this;
            callback = function (colKeyA, colKeyB) {
                var valA = table.get(colKeyA, rowKey);
                var valB = table.get(colKeyB, rowKey);
                var retVal;
                if (mode >= 2) {
                    valA = parseFloat(valA);
                    valB = parseFloat(valB);
                }
                switch (mode) {
                    case 0:
                    case 2:
                        retVal = (valA > valB) ? 1 :
                            (valA < valB) ? -1 : 0;
                        break;

                    case 1:
                    case 3:
                        retVal = (valA < valB) ? 1 :
                            (valA > valB) ? -1 : 0;
                        break;
                }
                return retVal;
            }
        }

        this.colKeys.sort(callback);
        return this;
    }

    setCursor(colKey, rowKey) {
        var cursor = this.cursor;
        cursor.colKey = colKey;
        cursor.rowKey = rowKey;
        return this;
    }

}

const defaultTypeConvert = function (table, colKey, rowKey, value) {
    return TypeConvert(value);
}

const SORTMODE = {
    'ascending': 0,
    'descending': 1,
    'logical ascending': 2,
    'logical descending': 3
}
export default CsvToHashTable;