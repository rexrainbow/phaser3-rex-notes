import Vertex from '../vertex/Vertex.js';
import Face from '../vertex/Face.js';

const GetFirst = Phaser.Utils.Array.GetFirst;

export default {
    clear() {
        this.faces.length = 0;
        this.vertices.length = 0;
        this.setFaceCountDirtyFlag();
        return this;
    },

    createVertex(nu, nv) {
        if (nu === undefined) { nu = 0; }
        if (nv === undefined) { nv = 0; }

        var vertex = new Vertex();
        vertex.setNormalUV(nu, nv);
        return vertex;
    },

    createFace(vertex0, vertex1, vertex2) {
        return new Face(vertex0, vertex1, vertex2);
    },

    addFace(face) {
        if (this.faces.includes(face)) {
            return this;
        }

        face.setParent(this);

        this.faces.push(face);
        this.setFaceCountDirtyFlag();

        var frame = this.frame;
        face
            .setFrameSize(frame.cutWidth, frame.cutHeight)
            .setUV(frame.u0, frame.v0, frame.u1, frame.v1)
            .resetVerticesPosition();

        var vertices = this.vertices;
        face.vertices.forEach(function (faceVertex) {
            if (vertices.includes(faceVertex)) {
                return;
            }
            vertices.push(faceVertex);
        })

        return this;
    },

    addFaces(faces) {
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            this.addFace(faces[i]);
        }
        return this;
    },

    getVertexByName(name) {
        return GetFirst(this.vertices, 'name', name);
    },

    getFaceByName(name) {
        return GetFirst(this.faces, 'name', name);
    },
}