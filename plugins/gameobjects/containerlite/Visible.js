export default {
    updateChildVisible(child) {
        child.visible = this.visible && this.getLocalState(child).visible;
        return this;
    },

    syncVisible() {
        if (this.children && this.syncChildrenEnable) {
            this.children.getChildren().forEach(this.updateChildVisible, this);
        }
        return this;
    },

    resetChildVisibleState(gameObject) {
        this.getLocalState(gameObject).visible = gameObject.visible;
        return this;
    },

    setChildVisible(gameObject, visible) {
        gameObject.visible = visible;
        this.resetChildVisibleState(gameObject);
        return this;
    },
    
    setChildLocalVisible(gameObject, visible) {
        if (visible === undefined) {
            visible = true;
        }
        this.getLocalState(gameObject).visible = visible;
        this.updateChildVisible(gameObject);
        return this;
    },
};