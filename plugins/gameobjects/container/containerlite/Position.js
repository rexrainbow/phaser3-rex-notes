import GetLocalState from './utils/GetLocalState.js';
import GetScale from './utils/GetScale.js';

export default {
    updateChildPosition(child) {
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

    resetChildPositionState(child) {
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

    setChildPosition(child, x, y) {
        child.x = x;
        child.y = y;
        this.resetChildPositionState(child);
        return this;
    },

    setChildLocalPosition(child, x, y) {
        var localState = GetLocalState(child);
        localState.x = x;
        localState.y = y;
        this.updateChildPosition(child);
        return this;
    },

    resetLocalPositionState() {
        var parent = GetLocalState(this).parent;
        if (parent) {
            parent.resetChildPositionState(this);
        }
        return this;
    },

    getChildLocalX(child) {
        var localState = GetLocalState(child);
        return localState.x;
    },

    getChildLocalY(child) {
        var localState = GetLocalState(child);
        return localState.y;
    },

};