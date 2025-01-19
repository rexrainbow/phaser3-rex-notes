import {
    UPDATE_ARRAYS, UPDATE_UV, UPDATE_VERTEX, UPDATE_ALPHA, UPDATE_COLOR
} from './DirtyFlags.js';

export default {
    updateBuffers() {
        if (!this.dirty) {
            return this;
        }

        if (this.dirtyFlags & UPDATE_ARRAYS) { this.resizeBuffers(); }
        if (this.dirtyFlags & UPDATE_UV) { this.updateUVBuffer(); }
        if (this.dirtyFlags & UPDATE_VERTEX) { this.updateVertexBuffer(); }
        if (this.dirtyFlags & UPDATE_ALPHA) { this.updateAlphaBuffer(); }
        if (this.dirtyFlags & UPDATE_COLOR) { this.updateColorBuffer(); }

        this.clearDirtyFlag();

        return this;
    },

    resizeBuffers() {
        var size = this.faces.length;
        this.vertexBuffer = new Float32Array(size * 6);
        this.uvBuffer = new Float32Array(size * 6);
        this.colorBuffer = new Uint32Array(size * 3);
        this.alphaBuffer = new Float32Array(size * 3);
        return this;
    },

    updateUVBuffer() {
        var uvBuffer = this.uvBuffer,
            index;
        var faces = this.faces,
            vertices;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            vertices = faces[i].vertices;

            index = i * 6;
            uvBuffer[index] = vertices[0].frameU;
            uvBuffer[index + 1] = vertices[0].frameV;
            uvBuffer[index + 2] = vertices[1].frameU;
            uvBuffer[index + 3] = vertices[1].frameV;
            uvBuffer[index + 4] = vertices[2].frameU;
            uvBuffer[index + 5] = vertices[2].frameV;
        }

        return this;
    },

    updateVertexBuffer() {
        var vertexBuffer = this.vertexBuffer,
            index;
        var faces = this.faces,
            vertices;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            vertices = faces[i].vertices;

            index = i * 6;
            vertexBuffer[index] = vertices[0].localX;
            vertexBuffer[index + 1] = vertices[0].localY;
            vertexBuffer[index + 2] = vertices[1].localX;
            vertexBuffer[index + 3] = vertices[1].localY;
            vertexBuffer[index + 4] = vertices[2].localX;
            vertexBuffer[index + 5] = vertices[2].localY;
        }

        return this;
    },

    updateAlphaBuffer() {
        var alphaBuffer = this.alphaBuffer,
            index;
        var faces = this.faces,
            vertices;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            vertices = faces[i].vertices;

            index = i * 3;
            alphaBuffer[index] = vertices[0].alpha;
            alphaBuffer[index + 1] = vertices[1].alpha;
            alphaBuffer[index + 2] = vertices[2].alpha;
        }

        return this;
    },

    updateColorBuffer() {
        var colorBuffer = this.colorBuffer,
            index;
        var faces = this.faces,
            vertices;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            vertices = faces[i].vertices;

            index = i * 3;
            colorBuffer[index] = vertices[0].color;
            colorBuffer[index + 1] = vertices[1].color;
            colorBuffer[index + 2] = vertices[2].color;
        }

        return this;
    }

}