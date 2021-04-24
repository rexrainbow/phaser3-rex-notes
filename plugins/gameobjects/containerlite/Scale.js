import GetLocalState from './utils/GetLocalState.js';
import GetScale from './utils/GetScale.js';

export default {
    updateChildScale(child) {
        var localState = GetLocalState(child);
        var parent = localState.parent;
        child.scaleX = parent.scaleX * localState.scaleX;
        child.scaleY = parent.scaleY * localState.scaleY;
        return this;
    },

    syncScale() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildScale, this);
        }
        return this;
    },

    resetChildScaleState(child) {
        var localState = GetLocalState(child);
        var parent = localState.parent;
        localState.scaleX = GetScale(child.scaleX, parent.scaleX);
        localState.scaleY = GetScale(child.scaleY, parent.scaleY);
        return this;
    },

    setChildScale(child, scaleX, scaleY) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }
        child.scaleX = scaleX;
        child.scaleY = scaleY;
        this.resetChildScaleState(child);
        return this;
    },

    setChildLocalScale(child, scaleX, scaleY) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }
        var localState = GetLocalState(child);
        localState.scaleX = scaleX;
        localState.scaleY = scaleY;
        this.updateChildScale(child);
        return this;
    },

    setChildDisplaySize(child, width, height) {
        child.setDisplaySize(width, height);
        this.resetChildScaleState(child);
        return this;
    }
}