import Clean from './../utils/object/Clean.js';
const GetValue = Phaser.Utils.Objects.GetValue;

class Cell {
    constructor(parent, config) {
        this.parent = parent; // parent: table
        this.container = null;
        this.data = null;
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.index = GetValue(o, 'idx', 0);
        this.columnIndex = GetValue(o, 'colIdx', 0);
        this.rowIndex = GetValue(o, 'rowIdx', 0);
        this.deltaHeight = 0;
        return this;
    }

    setContainer(container) {
        if (this.container) {
            this.container.destroy();
        }
        this.rootContainer.add(container);
        this.container = container;
        return this;
    }

    popContainer() {
        if (this.container) {
            var container = this.container;
            this.container = null;
            return container;
        } else {
            return null;
        }
    }

    hide() {
        if (this.container) {
            this.container.destroy();
            this.container = null;
        }
    }

    setTLXY(tlx, tly) {
        if (this.container) {
            this.container.x = tlx;
            this.container.y = tly;
        }
    }

    setData(key, value) {
        if (!this.data) {
            this.data = {};
        }

        this.data[key] = value;
        return this;
    }

    getData(key, defaultValue) {
        if (!this.data) {
            this.data = {};
        }

        var data = this.data;
        if (data.hasOwnProperty(key)) {
            return data[key];
        } else {
            return defaultValue;
        }
    }

    free() {
        this.hide();
        this.parent = undefined;
        if (this.data) {
            Clean(this.data);
        }
    }

    get rootContainer() {
        return this.parent.parent;
    }
};

export default Cell;