import GetLocalState from './utils/GetLocalState';

export default {
    updateChildActive(child?: any) {
        var localState = GetLocalState(child);
        var parent = localState.parent;
        child.active = parent.active && localState.active;
        return this;
    },

    syncActive() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildActive, this);
        }
        return this;
    },

    resetChildActiveState(child?: any) {
        var localState = GetLocalState(child);
        localState.active = child.active;
        return this;
    },

    setChildActive(child?: any, active?: any) {
        child.active = active;
        this.resetChildActiveState(child);
        return this;
    },

    setChildLocalActive(child?: any, active?: any) {
        if (active === undefined) {
            active = true;
        }
        var localState = GetLocalState(child);
        localState.active = active;
        this.updateChildActive(child);
        return this;
    },

    resetLocalActiveState() {
        var parent = GetLocalState(this).parent;
        if (parent?: any) {
            parent.resetChildActiveState(this);
        }
        return this;
    },

    getChildLocalActive(child?: any) {
        var localState = GetLocalState(child);
        return localState.active;
    },
};