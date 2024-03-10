import GetLocalState from './utils/GetLocalState.js';

export default {
    updateCameraFilter(child) {
        var state = GetLocalState(child);
        var parent = state.parent;

        if (state.syncCameraFilter) {
            child.cameraFilter = parent.cameraFilter;
        }

        return this;
    },

    syncCameraFilter() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateCameraFilter, this);
        }
        return this;
    },
}