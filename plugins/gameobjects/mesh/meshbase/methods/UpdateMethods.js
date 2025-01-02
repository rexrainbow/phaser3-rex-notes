const UPDATE_ARRAYS = (1 << 0);
const UPDATE_UV = (1 << 1);
const UPDATE_VERTEX = (1 << 2);
const UPDATE_ALPHA = (1 << 3);
const UPDATE_COLOR = (1 << 4);
const UPDATE_ALL = UPDATE_ARRAYS | UPDATE_UV | UPDATE_VERTEX | UPDATE_ALPHA | UPDATE_COLOR;

export default {
    updateArrays() {
        if (!this.dirty) {
            return this;
        }

        if (this.dirtyFlags & UPDATE_ARRAYS) { this.resizeArrays(); }
        if (this.dirtyFlags & UPDATE_UV) { this.updateUVs(); }
        if (this.dirtyFlags & UPDATE_VERTEX) { this.updateVertices(); }
        if (this.dirtyFlags & UPDATE_ALPHA) { this.updateAlphas(); }
        if (this.dirtyFlags & UPDATE_COLOR) { this.updateColors(); }

        this.clearDirtyFlag();

        return this;
    },

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

    resizeArrays() {
        var size = this.faces.length;
        this.vertices = new Float32Array(size * 6);
        this.uv = new Float32Array(size * 6);
        this.colors = new Uint32Array(size * 3);
        this.alphas = new Float32Array(size * 3);

        return this;
    },

    updateUVs() {
        var uv = this.uv,
            index;
        var faces = this.faces,
            face;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            face = faces[i];

            index = i * 6;
            uv[index] = face.vertex0.u;
            uv[index + 1] = face.vertex0.v;
            uv[index + 2] = face.vertex1.u;
            uv[index + 3] = face.vertex1.v;
            uv[index + 4] = face.vertex2.u;
            uv[index + 5] = face.vertex2.v;
        }

        return this;
    },

    updateVertices() {
        var vertices = this.vertices,
            index;
        var faces = this.faces,
            face;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            face = faces[i];

            index = i * 6;
            vertices[index] = face.vertex0.x;
            vertices[index + 1] = face.vertex0.y;
            vertices[index + 2] = face.vertex1.x;
            vertices[index + 3] = face.vertex1.y;
            vertices[index + 4] = face.vertex2.x;
            vertices[index + 5] = face.vertex2.y;
        }

        return this;
    },

    updateAlphas() {
        var alphas = this.alphas,
            index;
        var faces = this.faces,
            face;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            face = faces[i];

            index = i * 3;
            alphas[index] = face.vertex0.alpha;
            alphas[index + 1] = face.vertex1.alpha;
            alphas[index + 2] = face.vertex2.alpha;
        }

        return this;
    },

    updateColors() {
        var colors = this.colors,
            index;
        var faces = this.faces,
            face;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            face = faces[i];

            index = i * 3;
            colors[index] = face.vertex0.color;
            colors[index + 1] = face.vertex1.color;
            colors[index + 2] = face.vertex2.color;
        }

        return this;
    }

}