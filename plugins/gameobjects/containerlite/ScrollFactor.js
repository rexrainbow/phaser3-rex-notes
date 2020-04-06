export default {
    updateChildScrollFactor(child) {
        child.setScrollFactor(this.scrollFactorX, this.scrollFactorY);
        return this;
    },

    syncScrollFactor() {
        if (this.syncChildrenEnable && this.children) {
            this.children.forEach(this.updateChildScrollFactor, this);
        }
        return this;
    },

};