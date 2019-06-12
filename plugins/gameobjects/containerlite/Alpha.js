import Scale from './Scale.js';

export default {
    updateChildAlpha(child) {
        child.alpha = this.alpha * this.getLocalState(child).alpha;
        return this;
    },

    syncAlpha() {
        if (this.children && this.syncChildrenEnable) {
            this.children.getChildren().forEach(this.updateChildAlpha, this);
        }
        return this;
    },

    resetChildAlphaState(gameObject) {
        this.getLocalState(gameObject).alpha = Scale(gameObject.alpha, this.alpha);
        return this;
    },
    
    setChildAlpha(gameObject, alpha) {
        gameObject.alpha = alpha;
        this.resetChildAlphaState(gameObject);
        return this._add;
    },
    
    setChildLocalAlpha(gameObject, alpha) {
        this.getLocalState(gameObject).alpha = alpha;
        this.updateChildAlpha(gameObject);
        return this;
    },
};