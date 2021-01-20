import GetScale from './utils/GetScale.js';

export default {
    updateChildAlpha(child) {
        child.alpha = this.alpha * this.getLocalState(child).alpha;
        return this;
    },

    syncAlpha() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildAlpha, this);
        }
        return this;
    },

    resetChildAlphaState(gameObject) {
        this.getLocalState(gameObject).alpha = GetScale(gameObject.alpha, this.alpha);
        return this;
    },
    
    setChildAlpha(gameObject, alpha) {
        gameObject.alpha = alpha;
        this.resetChildAlphaState(gameObject);
        return this;
    },
    
    setChildLocalAlpha(gameObject, alpha) {
        this.getLocalState(gameObject).alpha = alpha;
        this.updateChildAlpha(gameObject);
        return this;
    },
};