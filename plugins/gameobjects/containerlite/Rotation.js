export default {
    updateChildRotation(child) {
        child.rotation = this.rotation + this.getLocalState(child).rotation;
        return this;
    },

    syncRotation() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildRotation, this);
        }
        return this;
    },

    resetChildRotationState(gameObject) {
        this.getLocalState(gameObject).rotation = gameObject.rotation - this.rotation;
        return this;
    },

    setChildRotation(gameObject, rotation) {
        gameObject.rotation = rotation;
        this.resetChildRotationState(gameObject);
        return this;
    },

    setChildLocalRotation(gameObject, rotation) {
        this.getLocalState(gameObject).rotation = rotation;
        this.updateChildRotation(gameObject);
        return this;
    },
}