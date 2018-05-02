import Clean from './../utils/object/Clean.js';

class Cell {
    constructor(parent, config) {
        this.parent = parent; // parent: table
        this.container = null;
        this.data = null;
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.deltaHeight = 0;
        return this;
    }

    addObject(gameobject) {
        if (!this.container) {
            var parentObject = this.parent.parent;
            var scene = parentObject.scene;
            this.container = scene.add.container(0, 0);
            parentObject.add(this.container);
        }
        this.container.add(gameobject);
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
        this.parent = undefined;
        if (this.data) {
            Clean(this.data);
        }
    }
};

export default Cell;