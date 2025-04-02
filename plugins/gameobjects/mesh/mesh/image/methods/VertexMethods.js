import Vertex from '../vertex/Vertex.js';
import Face from '../vertex/Face.js';
import GenerateGridVertices from '../../utils/GenerateGridVertices.js';

const GetFirst = Phaser.Utils.Array.GetFirst;

export default {
    clear() {
        this.faces.length = 0;
        this.vertices.length = 0;
        this.setFaceCountDirtyFlag();
        return this;
    },

    createVertex(u, v) {
        if (u === undefined) { u = 0; }
        if (v === undefined) { v = 0; }

        var vertex = new Vertex();
        vertex.setUV(u, v);
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
            .setFrameUV(frame.u0, frame.v0, frame.u1, frame.v1)
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

    resetFaceSize() {
        var frame = this.frame;
        var frameWidth = frame.realWidth;
        var frameHeight = frame.realHeight;

        var faces = this.faces;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            faces[i].setFrameSize(frameWidth, frameHeight)
        }

        return this;
    },

    addGridFaces(columns, rows, sharedVertexMode) {
        GenerateGridVertices(this, columns, rows, sharedVertexMode);
        return this;
    },

    getVertexByName(name) {
        return GetFirst(this.vertices, 'name', name);
    },

    getFaceByName(name) {
        return GetFirst(this.faces, 'name', name);
    },

    resetVerticesPosition() {
        var vertices = this.vertices;
        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
            vertices[i].resetPosition();
        }
        return this;
    }
}