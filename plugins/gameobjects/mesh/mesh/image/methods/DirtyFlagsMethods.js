import {
    UPDATE_ARRAYS, UPDATE_UV, UPDATE_VERTEX, UPDATE_ALPHA, UPDATE_COLOR, UPDATE_ALL
} from './DirtyFlags.js';

export default {
    clearDirtyFlag() {
        this.dirtyFlags = 0;
        return this;
    },

    setFaceCountDirtyFlag() {
        this.dirtyFlags |= UPDATE_ALL;
        return this;
    },

    setUVDirtyFlag() {
        this.dirtyFlags |= UPDATE_UV;
        return this;
    },

    setVertexDirtyFlag() {
        this.dirtyFlags |= UPDATE_VERTEX;
        return this;
    },

    setAlphaDirtyFlag() {
        this.dirtyFlags |= UPDATE_ALPHA;
        return this;
    },

    setColorDirtyFlag() {
        this.dirtyFlags |= UPDATE_COLOR;
        return this;
    },
}