export default {
    updateChildMask(child) {
        // Don't propagate null mask to clear children's mask
        if (this.mask == null) {
            return this;
        }

        var maskGameObject = (this.mask.hasOwnProperty('geometryMask')) ? this.mask.geometryMask : this.mask.bitmapMask;
        if (maskGameObject !== child) {
            child.mask = this.mask;
        }
        return this;
    },

    syncMask() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildMask, this);
        }
        return this;
    },

    setMask(mask) {
        this.mask = mask;
        return this;
    },

    // Internal use
    clearChildrenMask() {
        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            // Clear child's mask
            if (child.clearMask) {
                child.clearMask(false);
            }

            if (!child.hasOwnProperty('isRexContainerLite')) {
                this.setChildMaskVisible(child);
                // Set child's maskVisible to `true`
            }
        }
        return this;
    },

    clearMask(destroyMask) {
        if (destroyMask === undefined) {
            destroyMask = false;
        }

        // Clear current mask
        if (destroyMask && this.mask) {
            mask.destroy();
        }
        this._mask = null;

        this.setChildMaskVisible(this);
        // Also set maskVisible to `true`

        this.clearChildrenMask();

        return this;
    },
};