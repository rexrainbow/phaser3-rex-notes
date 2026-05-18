import GetLocalState from './utils/GetLocalState';

import { Math as PhaserMath } from 'phaser';
const DegToRad = PhaserMath.DegToRad;

export default {
    updateChildRotation(child?: any) {
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

    resetChildRotationState(child?: any) {
        var localState = GetLocalState(child);
        var parent = localState.parent;
        localState.rotation = child.rotation - parent.rotation;
        return this;
    },

    setChildRotation(child?: any, rotation?: any) {
        child.rotation = rotation;
        this.resetChildRotationState(child);
        return this;
    },

    setChildAngle(child?: any, angle?: any) {
        child.angle = angle;
        this.resetChildRotationState(child);
        return this;
    },

    setChildLocalRotation(child?: any, rotation?: any) {
        var localState = GetLocalState(child);
        localState.rotation = rotation;
        this.updateChildRotation(child);
        return this;
    },

    setChildLocalAngle(child?: any, angle?: any) {
        var localState = GetLocalState(child);
        localState.rotation = DegToRad(angle);
        this.updateChildRotation(child);
        return this;
    },

    resetLocalRotationState() {
        var parent = GetLocalState(this).parent;
        if (parent?: any) {
            parent.resetChildRotationState(this);
        }
        return this;
    },

    getChildLocalRotation(child?: any) {
        var localState = GetLocalState(child);
        return localState.rotation;
    },

}