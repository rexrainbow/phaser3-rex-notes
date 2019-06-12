import Scale from './Scale.js';

export default {
    updateChildPosition(child) {
        if (child.isRexContainerLite) {
            child.syncChildrenEnable = false;
        }
        var state = this.getLocalState(child);
        child.x = state.x;
        child.y = state.y;
        this.localToWorld(child);

        child.scaleX = state.scaleX * this.scaleX;
        child.scaleY = state.scaleY * this.scaleY;

        if (child.flipX !== undefined) {
            child.flipX = (!this.flipX) ? state.flipX : !state.flipX;
            child.flipY = (!this.flipY) ? state.flipY : !state.flipY;
        }

        child.rotation = state.rotation + this.rotation;

        if (child.isRexContainerLite) {
            child.syncChildrenEnable = true;
            child.syncPosition();
        }
        return this;
    },

    syncPosition() {
        if (this.children && this.syncChildrenEnable) {
            this.children.getChildren().forEach(this.updateChildPosition, this);
        }
        return this;
    },

    resetChildPositionState(gameObject) {
        var state = this.getLocalState(gameObject);
        state.x = gameObject.x;
        state.y = gameObject.y;
        this.worldToLocal(state);

        state.scaleX = Scale(gameObject.scaleX, this.scaleX);
        state.scaleY = Scale(gameObject.scaleY, this.scaleY);

        if (gameObject.flipX !== undefined) {
            state.flipX = gameObject.flipX;
            state.flipY = gameObject.flipY;
        }

        state.rotation = gameObject.rotation - this.rotation;
        return this;
    },
    
    setChildPosition(gameObject, x, y) {
        gameObject.x = x;
        gameObject.y = y;
        this.resetChildPositionState(gameObject);
        return this;
    },

    setChildLocalPosition(gameObject, x, y) {
        var state = this.getLocalState(gameObject);
        state.x = x;
        state.y = y;
        this.updateChildPosition(gameObject);
        return this;
    },
};