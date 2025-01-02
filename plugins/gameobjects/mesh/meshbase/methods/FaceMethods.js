import Vertex from '../face/Vertex.js';
import Face from '../face/Face.js';

export default {
    clear() {
        this.faces.length = 0;
        this.vertices.length = 0;
        this.setFaceCountDirtyFlag();
        return this;
    },

    createVertex() {
        return new Vertex(this);
    },

    createFace(vertex0, vertex1, vertex2) {
        return new Face(this, vertex0, vertex1, vertex2);
    },

    addFace(face) {
        if (this.faces.includes(face)) {
            return this;
        }

        this.faces.push(face);
        this.setFaceCountDirtyFlag();

        var frame = this.frame;
        face.setFrameSize(frame.cutWidth, frame.cutHeight);
        face.setUV(frame.u0, frame.v0, frame.u1, frame.v1);

        var vertices = this.vertices;
        if (!vertices.includes(face.vertex0)) {
            vertices.push(face.vertex0);
        }
        if (!vertices.includes(face.vertex1)) {
            vertices.push(face.vertex1);
        }
        if (!vertices.includes(face.vertex2)) {
            vertices.push(face.vertex2);
        }

        return this;
    },

    addFaces(faces) {
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            this.addFace(faces[i]);
        }
        return this;
    }
}