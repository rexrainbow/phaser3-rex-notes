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

    get scrollMode() {
        return this.parentContainer.scrollMode;
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
        if (this.scrollMode === 0) {
            return this.deltaHeight + this.parent.defaultCellHeight;
        } else {
            return this.parent.defaultCellWidth;
        }
    }

    set height(height) {
        // Only worked when scrollMode is 0
        if (this.scrollMode === 1) {
            return;
        }
        this.setDeltaHeight(height - this.parent.defaultCellHeight);
    }

    setHeight(height) {
        // Only worked when scrollMode is 0
        this.height = height;
        return this;
    }

    get width() {
        if (this.scrollMode === 0) {
            return this.parent.defaultCellWidth;
        } else {
            return this.deltaHeight + this.parent.defaultCellHeight;
        }
    }

    set width(width) {
        // Only worked when scrollMode is 1
        if (this.scrollMode === 0) {
            return;
        }
        this.setDeltaHeight(width - this.parent.defaultCellHeight);
    }

    setWidth(width) {
        this.width = width;
        return this;
    }

    get scene() {
        return this.parentContainer.scene;
    }
};

export default Cell;