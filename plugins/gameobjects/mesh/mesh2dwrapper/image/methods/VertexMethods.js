import VertexObject from '../VertexObject.js';

export default {
    clear() {
        this.vertexObjects.length = 0;
        this.faceIndices.length = 0;
        this.vertices.length = 0;
        this.indices.length = 0;
        this.indicesOrdered = null;
        this.setUseOrderedIndices(false);
        return this;
    },

    createVertexObject(u, v) {
        var index = this.vertexObjects.length;
        var vertexObject = new VertexObject(null, index, u, v);

        this.vertexObjects.push(vertexObject);
        this.vertices.push(0, 0, 0, 0);

        vertexObject.setParent(this, index);
        this.updateVertexObjectFrame(vertexObject);

        return vertexObject;
    },

    addVertexObject(vertexObject) {
        if (this.vertexObjects.includes(vertexObject)) {
            return this;
        }

        var index = this.vertexObjects.length;
        this.vertexObjects.push(vertexObject);
        this.vertices.push(0, 0, 0, 0);

        vertexObject.setParent(this, index);
        this.updateVertexObjectFrame(vertexObject);

        return this;
    },

    setVertexObjects(vertexObjects) {
        this.vertexObjects.length = 0;
        this.vertices.length = 0;

        for (var i = 0, cnt = vertexObjects.length; i < cnt; i++) {
            this.addVertexObject(vertexObjects[i]);
        }

        return this;
    },

    resetVertexObjects() {
        var vertexObjects = this.vertexObjects;

        for (var i = 0, cnt = vertexObjects.length; i < cnt; i++) {
            vertexObjects[i].resetPosition();
        }

        return this;
    },

    writeVertexObjectPositions() {
        var vertexObjects = this.vertexObjects;

        for (var i = 0, cnt = vertexObjects.length; i < cnt; i++) {
            vertexObjects[i].writePositionToMesh();
        }

        return this;
    },

    rebuildVerticesFromVertexObjects() {
        var vertexObjects = this.vertexObjects;
        this.vertices.length = vertexObjects.length * 4;

        for (var i = 0, cnt = vertexObjects.length; i < cnt; i++) {
            vertexObjects[i].setParent(this, i);
        }

        return this;
    },
}
