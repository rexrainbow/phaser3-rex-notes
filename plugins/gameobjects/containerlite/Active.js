export default {
    updateChildActive(child) {
        child.active = this.active && this.getLocalState(child).active;
        return this;
    },

    syncActive() {
        if (this.children && this.syncChildrenEnable) {
            this.children.getChildren().forEach(this.updateChildActive, this);
        }
        return this;
    },
    
    resetChildActiveState(gameObject) {
        this.getLocalState(gameObject).active = gameObject.active;
        return this;
    },

    setChildActive(gameObject, active) {
        gameObject.active = active;
        this.resetChildActiveState(gameObject);
        return this;
    },

    setChildLocalActive(gameObject, active) {
        if (active === undefined) {
            active = true;
        }
        this.getLocalState(gameObject).active = active;
        this.updateChildActive(gameObject);
        return this;
    },
};