import GetLocalState from './utils/GetLocalState.js';
import GetScale from './utils/GetScale.js';

export default {
    updateChildAlpha(child) {
        var localState = GetLocalState(child);
        var parent = localState.parent;
        child.alpha = parent.alpha * localState.alpha;
        return this;
    },

    syncAlpha() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildAlpha, this);
        }
        return this;
    },

    resetChildAlphaState(child) {
        var localState = GetLocalState(child);
        var parent = localState.parent;
        localState.alpha = GetScale(child.alpha, parent.alpha);
        return this;
    },

    setChildAlpha(child, alpha) {
        child.alpha = alpha;
        this.resetChildAlphaState(child);
        return this;
    },

    setChildLocalAlpha(child, alpha) {
        var localState = GetLocalState(child);
        localState.alpha = alpha;
        this.updateChildAlpha(child);
        return this;
    },
};