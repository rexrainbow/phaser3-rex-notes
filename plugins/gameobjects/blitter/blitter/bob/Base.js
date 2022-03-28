import DataMethods from '../../../../utils/data/DataMethods.js'

class Base {
    constructor(parent, type) {
        this.setParent(parent);
        this.type = type;

        this.reset().setActive();
    }

    destroy() {
        this.parent.removeChild(this);
    }

    setParent(parent) {
        this.parent = parent;
        return this;
    }

    get scene() {
        return this.parent.scene;
    }

    setDisplayListDirty(displayListDirty) {
        if (displayListDirty && this.parent) {
            this.parent.displayListDirty = true;
        }
        return this;
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this.setDisplayListDirty(this._active != value);
        this._active = value;
    }

    setActive(active) {
        if (active === undefined) {
            active = true;
        }
        this.active = active;
        return this;
    }

    modifyPorperties(o) {
        return this;
    }

    // Override
    onFree() { }
}

Object.assign(
    Base.prototype,
    DataMethods
);

export default Base;