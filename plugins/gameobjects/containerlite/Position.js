import GetLocalState from './utils/GetLocalState.js';
import GetScale from './utils/GetScale.js';

export default {
    updateChildPosition(child) {
        if (child.isRexContainerLite) {
            child.syncChildrenEnable = false;
        }
        var state = GetLocalState(child);
        var parent = state.parent;
        child.x = state.x;
        child.y = state.y;
        parent.localToWorld(child);

        child.scaleX = state.scaleX * parent.scaleX;
        child.scaleY = state.scaleY * parent.scaleY;

        if (child.flipX !== undefined) {
            child.flipX = (!parent.flipX) ? state.flipX : !state.flipX;
            child.flipY = (!parent.flipY) ? state.flipY : !state.flipY;
        }

        child.rotation = state.rotation + parent.rotation;

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
        var state = GetLocalState(child);
        var parent = state.parent;
        state.x = child.x;
        state.y = child.y;
        parent.worldToLocal(state);

        state.scaleX = GetScale(child.scaleX, parent.scaleX);
        state.scaleY = GetScale(child.scaleY, parent.scaleY);

        if (child.flipX !== undefined) {
            state.flipX = child.flipX;
            state.flipY = child.flipY;
        }

        state.rotation = child.rotation - parent.rotation;
        return this;
    },

    setChildPosition(child, x, y) {
        child.x = x;
        child.y = y;
        this.resetChildPositionState(child);
        return this;
    },

    setChildLocalPosition(child, x, y) {
        var state = GetLocalState(child);
        state.x = x;
        state.y = y;
        this.updateChildPosition(child);
        return this;
    },
};