import GetLocalState from './utils/GetLocalState';
import GetScale from './utils/GetScale';

export default {
    updateChildScale(child?: any) {
        var state = GetLocalState(child);
        var parent = state.parent;
        if (state.syncScale) {
            child.scaleX = parent.scaleX * state.scaleX;
            child.scaleY = parent.scaleY * state.scaleY;
        }
        return this;
    },

    syncScale() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildScale, this);
        }
        return this;
    },

    resetChildScaleState(child?: any) {
        var state = GetLocalState(child);
        var parent = state.parent;
        state.scaleX = GetScale(child.scaleX, parent.scaleX);
        state.scaleY = GetScale(child.scaleY, parent.scaleY);
        return this;
    },

    setChildScale(child?: any, scaleX?: any, scaleY?: any) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }
        child.scaleX = scaleX;
        child.scaleY = scaleY;
        this.resetChildScaleState(child);
        return this;
    },

    setChildScaleX(child?: any, scaleX?: any) {
        child.scaleX = scaleX;
        this.resetChildScaleState(child);
        return this;
    },

    setChildScaleY(child?: any, scaleY?: any) {
        child.scaleY = scaleY;
        this.resetChildScaleState(child);
        return this;
    },

    setChildLocalScale(child?: any, scaleX?: any, scaleY?: any) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }
        var state = GetLocalState(child);
        state.scaleX = scaleX;
        state.scaleY = scaleY;
        this.updateChildScale(child);
        return this;
    },

    setChildLocalScaleX(child?: any, scaleX?: any) {
        var state = GetLocalState(child);
        state.scaleX = scaleX;
        this.updateChildScale(child);
        return this;
    },

    setChildLocalScaleY(child?: any, scaleY?: any) {
        var state = GetLocalState(child);
        state.scaleY = scaleY;
        this.updateChildScale(child);
        return this;
    },

    setChildDisplaySize(child?: any, width?: any, height?: any) {
        child.setDisplaySize(width, height);
        this.resetChildScaleState(child);
        return this;
    },

    resetLocalScaleState() {
        var parent = GetLocalState(this).parent;
        if (parent?: any) {
            parent.resetChildScaleState(this);
        }
        return this;
    },

    getChildLocalScaleX(child?: any) {
        var localState = GetLocalState(child);
        return localState.scaleX;
    },

    getChildLocalScaleY(child?: any) {
        var localState = GetLocalState(child);
        return localState.scaleY;
    },
}