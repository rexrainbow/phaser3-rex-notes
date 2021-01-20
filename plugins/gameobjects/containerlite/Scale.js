import GetScale from './utils/GetScale.js';

export default {
    updateChildScale(child) {
        child.scaleX = this.scaleX * this.getLocalState(child).scaleX;
        child.scaleY = this.scaleY * this.getLocalState(child).scaleY;
        return this;
    },

    syncScale() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildScale, this);
        }
        return this;
    },

    resetChildScaleState(gameObject) {
        this.getLocalState(gameObject).scaleX = GetScale(gameObject.scaleX, this.scaleX);
        this.getLocalState(gameObject).scaleY = GetScale(gameObject.scaleY, this.scaleY);
        return this;
    },

    setChildScale(gameObject, scaleX, scaleY) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }
        gameObject.scaleX = scaleX;
        gameObject.scaleY = scaleY;
        this.resetChildScaleState(gameObject);
        return this;
    },

    setChildLocalScale(gameObject, scaleX, scaleY) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }
        this.getLocalState(gameObject).scaleX = scaleX;
        this.getLocalState(gameObject).scaleY = scaleY;
        this.updateChildScale(gameObject);
        return this;
    },
}