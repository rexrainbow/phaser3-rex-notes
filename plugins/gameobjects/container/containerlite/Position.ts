import GetLocalState from './utils/GetLocalState';
import GetScale from './utils/GetScale';

export default {
    updateChildPosition(child?: any) {
        if (child.isRexContainerLite) {
            child.syncChildrenEnable = false;
        }
        var localState = GetLocalState(child);
        var parent = localState.parent;

        if (localState.syncPosition) {
            child.x = localState.x;
            child.y = localState.y;
            parent.localToWorld(child);
        }

        if (localState.syncRotation) {
            child.rotation = localState.rotation + parent.rotation;
        }

        if (localState.syncScale) {
            child.scaleX = localState.scaleX * parent.scaleX;
            child.scaleY = localState.scaleY * parent.scaleY;
        }

        if (child.isRexContainerLite) {
            child.syncChildrenEnable = true;
            child.syncPosition();
        }
        return this;
    },

    syncPosition() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildPosition, this);
        }
        return this;
    },

    resetChildPositionState(child?: any) {
        var localState = GetLocalState(child);
        var parent = localState.parent;
        localState.x = child.x;
        localState.y = child.y;
        parent.worldToLocal(localState);

        localState.scaleX = GetScale(child.scaleX, parent.scaleX);
        localState.scaleY = GetScale(child.scaleY, parent.scaleY);

        localState.rotation = child.rotation - parent.rotation;
        return this;
    },

    setChildPosition(child?: any, x?: any, y?: any) {
        child.x = x;
        child.y = y;
        this.resetChildPositionState(child);
        return this;
    },

    setChildLocalPosition(child?: any, x?: any, y?: any) {
        var localState = GetLocalState(child);
        localState.x = x;
        localState.y = y;
        this.updateChildPosition(child);
        return this;
    },

    resetLocalPositionState() {
        var parent = GetLocalState(this).parent;
        if (parent?: any) {
            parent.resetChildPositionState(this);
        }
        return this;
    },

    getChildLocalX(child?: any) {
        var localState = GetLocalState(child);
        return localState.x;
    },

    getChildLocalY(child?: any) {
        var localState = GetLocalState(child);
        return localState.y;
    },

};