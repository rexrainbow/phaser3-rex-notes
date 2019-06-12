export default {
    updateChildScrollFactor(child) {
        child.setScrollFactor(this.scrollFactorX, this.scrollFactorY);
        return this;
    },

    syncScrollFactor() {
        if (this.children && this.syncChildrenEnable) {
            this.children.getChildren().forEach(this.updateChildScrollFactor, this);
        }
        return this;
    },

};