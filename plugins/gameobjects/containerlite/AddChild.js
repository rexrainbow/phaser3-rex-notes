export default {
    add(gameObject) {
        if (Array.isArray(gameObject)) {
            this.addMultiple(gameObject);
        } else {
            this._add(gameObject);
        }
        return this;
    },

    addMultiple(gameObjects) {
        gameObjects.forEach(this._add, this);
        return this;
    },

    _add(gameObject) {
        this.children.add(gameObject);

        this
            .resetChildState(gameObject)           // Reset local state of child
            .updateChildVisible(gameObject)        // Apply parent's visible to child
            .updateChildActive(gameObject)         // Apply parent's active to child
            .updateChildScrollFactor(gameObject)   // Apply parent's scroll factor to child
            .updateChildMask(gameObject);          // Apply parent's mask to child
        return this;
    },
};