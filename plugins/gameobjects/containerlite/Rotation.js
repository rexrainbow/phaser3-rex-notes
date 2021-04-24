import GetLocalState from './utils/GetLocalState.js';

export default {
    updateChildRotation(child) {
        var localState = GetLocalState(child);
        var parent = localState.parent;
        child.rotation = parent.rotation + localState.rotation;
        return this;
    },

    syncRotation() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildRotation, this);
        }
        return this;
    },

    resetChildRotationState(child) {
        var localState = GetLocalState(child);
        var parent = localState.parent;
        localState.rotation = child.rotation - parent.rotation;
        return this;
    },

    setChildRotation(child, rotation) {
        child.rotation = rotation;
        this.resetChildRotationState(child);
        return this;
    },

    setChildLocalRotation(child, rotation) {
        var localState = GetLocalState(child);
        localState.rotation = rotation;
        this.updateChildRotation(child);
        return this;
    },
}