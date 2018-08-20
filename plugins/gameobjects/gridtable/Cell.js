import Clean from 'rexPlugins/utils/object/Clean.js';

class Cell {
    constructor(parent, config) {
        this.container = null;
        this.data = null;
        this.setParent(parent);
        this.deltaHeight = 0;
        //this.resetFromJSON(config);
    }

    setParent(parent) {
        this.parent = parent; // parent: table
        this.parentContainer = parent.getParentContainer();
    }

    //resetFromJSON(o) {
    //    return this;
    //}

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
            Clean(this.data);
        }
    }

    setDeltaHeight(deltaHeight) {
        if (deltaHeight == null) {
            deltaHeight = 0;
        }

        var table = this.parent;
        if ((this.deltaHeight === 0) && (deltaHeight !== 0)) {
            table.nonZeroDeltaHeightCount++;
        } else if ((this.deltaHeight !== 0) && (deltaHeight === 0)) {
            table.nonZeroDeltaHeightCount--;
        }

        this.deltaHeight = deltaHeight;
        return this;
    }

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

};

export default Cell;