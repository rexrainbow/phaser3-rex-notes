import GetLocalState from './utils/GetLocalState.js';

const DegToRad = Phaser.Math.DegToRad;

export default {
    updateChildRotation(child) {
        var localState = GetLocalState(child);
        var parent = localState.parent;
        if (localState.syncRotation) {
            child.rotation = parent.rotation + localState.rotation;
        }
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

    setChildAngle(child, angle) {
        child.angle = angle;
        this.resetChildRotationState(child);
        return this;
    },

    setChildLocalRotation(child, rotation) {
        var localState = GetLocalState(child);
        localState.rotation = rotation;
        this.updateChildRotation(child);
        return this;
    },

    setChildLocalAngle(child, angle) {
        var localState = GetLocalState(child);
        localState.rotation = DegToRad(angle);
        this.updateChildRotation(child);
        return this;
    },

    resetLocalRotationState() {
        var parent = GetLocalState(this).parent;
        if (parent) {
            parent.resetChildRotationState(this);
        }
        return this;
    },

    getChildLocalRotation(child) {
        var localState = GetLocalState(child);
        return localState.rotation;
    },

}