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
        this.vertexBuffer = new Float32Array(size * 6);
        this.uvBuffer = new Float32Array(size * 6);
        this.alphaBuffer = new Uint32Array(size * 3);
        this.colorBuffer = new Float32Array(size * 3);
        return this;
    },

    updateUVs() {
        var uvBuffer = this.uvBuffer,
            index;
        var faces = this.faces,
            face;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            face = faces[i];

            index = i * 6;
            uvBuffer[index] = face.vertex0.frameU;
            uvBuffer[index + 1] = face.vertex0.frameV;
            uvBuffer[index + 2] = face.vertex1.frameU;
            uvBuffer[index + 3] = face.vertex1.frameV;
            uvBuffer[index + 4] = face.vertex2.frameU;
            uvBuffer[index + 5] = face.vertex2.frameV;
        }

        return this;
    },

    updateVertices() {
        var vertexBuffer = this.vertexBuffer,
            index;
        var faces = this.faces,
            face;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            face = faces[i];

            index = i * 6;
            vertexBuffer[index] = face.vertex0.x;
            vertexBuffer[index + 1] = face.vertex0.y;
            vertexBuffer[index + 2] = face.vertex1.x;
            vertexBuffer[index + 3] = face.vertex1.y;
            vertexBuffer[index + 4] = face.vertex2.x;
            vertexBuffer[index + 5] = face.vertex2.y;
        }

        return this;
    },

    updateAlphas() {
        var alphaBuffer = this.alphaBuffer,
            index;
        var faces = this.faces,
            face;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            face = faces[i];

            index = i * 3;
            alphaBuffer[index] = face.vertex0.alpha;
            alphaBuffer[index + 1] = face.vertex1.alpha;
            alphaBuffer[index + 2] = face.vertex2.alpha;
        }

        return this;
    },

    updateColors() {
        var colorBuffer = this.colorBuffer,
            index;
        var faces = this.faces,
            face;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            face = faces[i];

            index = i * 3;
            colorBuffer[index] = face.vertex0.color;
            colorBuffer[index + 1] = face.vertex1.color;
            colorBuffer[index + 2] = face.vertex2.color;
        }

        return this;
    }

}