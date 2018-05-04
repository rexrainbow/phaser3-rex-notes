import Clean from './../utils/object/Clean.js';

class Cell {
    constructor(parent, config) {
        this.container = null;
        this.data = null;
        this.setParent(parent);
        //this.resetFromJSON(config);
    }

    setParent(parent) {
        this.parent = parent; // parent: table
        this.parentContainer = parent.getParentContainer();
    }

    //resetFromJSON(o) {
    //    return this;
    //}

    setContainer(container) {
        if (!this.parentContainer.isCellVisible(this)) {
            return this;
        }
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
            this.container.x = x;
            this.container.y = y;
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

    cleanData() {
        if (this.data) {
            Clean(this.data);
        }
    }

    destroy() {
        this.cleanData();
        this.destroyContainer();
        this.parent = undefined;
        this.parentContainer = undefined;
    }

};

export default Cell;