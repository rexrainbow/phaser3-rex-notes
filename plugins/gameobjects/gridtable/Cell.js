import Clear from '../../utils/object/Clear.js';

class Cell {
    constructor(parent, config) {
        this.container = null;
        this.data = null;
        this.setParent(parent);
        this._deltaHeight = 0;
        //this.resetFromJSON(config);
    }

    setParent(parent) {
        this.parent = parent; // parent: table
        this.parentContainer = parent.getParentContainer();
    }

    //resetFromJSON(o) {
    //    return this;
    //}

    destroy() {
        var table = this.parent;
        if (this.deltaHeight !== 0) {
            table.nonZeroDeltaHeightCount--;
        }

        this.cleanData();
        this.destroyContainer();
        this.parent = undefined;
        this.parentContainer = undefined;
    }

    get table() {
        return this.parent;
    }

    get colIndx() {
        return this.parent.cellIndxeToColIndex(this.index);
    }

    get rowIndx() {
        return this.parent.cellIndxeToRowIndex(this.index);
    }

    getContainer() {
        return this.container;
    }

    setContainer(container) {
        if (this.container) {
            this.container.destroy();
        }
        this.container = container;
        this.parentContainer.add(container);
        return this;
    }

    destroyContainer() {
        if (this.container) {
            this.container.destroy();
            this.container = null;
        }
    }

    popContainer() {
        if (this.container) {
            var container = this.container;
            this.container = null;
            this.parentContainer.remove(container);
            return container;
        } else {
            return null;
        }
    }

    setXY(x, y) {
        if (this.container) {
            this.parentContainer.setChildLocalPosition(this.container, x, y);
        }
        return this;
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

    cleanData() {
        if (this.data) {
            Clear(this.data);
        }
    }

    get deltaHeight() {
        return this._deltaHeight;
    }

    set deltaHeight(deltaHeight) {
        if (deltaHeight == null) {
            deltaHeight = 0;
        }
        var table = this.parent;
        if ((this._deltaHeight === 0) && (deltaHeight !== 0)) {
            table.nonZeroDeltaHeightCount++;
        } else if ((this._deltaHeight !== 0) && (deltaHeight === 0)) {
            table.nonZeroDeltaHeightCount--;
        }

        this._deltaHeight = deltaHeight;
    }

    setDeltaHeight(deltaHeight) {
        this.deltaHeight = deltaHeight;
        return this;
    }

    get height() {
        var table = this.parent;
        return this.deltaHeight + table.defaultCellHeight;
    }

    set height(height) {
        var table = this.parent;
        var deltaHeight;
        if (height === undefined) {
            deltaHeight = 0;
        } else {
            deltaHeight = height - table.defaultCellHeight;
        }
        this.setDeltaHeight(deltaHeight);
    }

    setHeight(height) {
        this.height = height;
        return this;
    }

    get width() {
        var table = this.parent;
        return table.defaultCellWidth;
    }

    get scene() {
        return this.parentContainer.scene;
    }
};

export default Cell;