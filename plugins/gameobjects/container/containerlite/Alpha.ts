import GetLocalState from './utils/GetLocalState';
import GetScale from './utils/GetScale';

export default {
    updateChildAlpha(child?: any) {
        var state = GetLocalState(child);
        var parent = state.parent;
        if (state.syncAlpha) {
            child.alpha = parent.alpha * state.alpha;
        }
        return this;
    },

    syncAlpha() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildAlpha, this);
        }
        return this;
    },

    resetChildAlphaState(child?: any) {
        var state = GetLocalState(child);
        var parent = state.parent;
        state.alpha = GetScale(child.alpha, parent.alpha);
        return this;
    },

    setChildAlpha(child?: any, alpha?: any) {
        child.alpha = alpha;
        this.resetChildAlphaState(child);
        return this;
    },

    setChildLocalAlpha(child?: any, alpha?: any) {
        var state = GetLocalState(child);
        state.alpha = alpha;
        this.updateChildAlpha(child);
        return this;
    },

    resetLocalAlphaState() {
        var parent = GetLocalState(this).parent;
        if (parent?: any) {
            parent.resetChildAlphaState(this);
        }
        return this;
    },

    getChildLocalAlpha(child?: any) {
        var localState = GetLocalState(child);
        return localState.alpha;
    },
};