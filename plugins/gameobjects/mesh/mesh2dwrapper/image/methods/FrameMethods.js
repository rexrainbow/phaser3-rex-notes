import { GameObjects as PhaserGameObjects } from 'phaser';

const Mesh2D = PhaserGameObjects.Mesh2D;

export default {
    setTexture(key, frame) {
        Mesh2D.prototype.setTexture.call(this, key, frame);

        if (this.vertexObjects) {
            this.syncVertexObjectsFrame();
        }

        return this;
    },

    setSizeToFrame(frame) {
        if (!frame) { frame = this.frame; }
        if (!frame) { return this; }

        this.width = frame.realWidth;
        this.height = frame.realHeight;

        return this;
    },

    updateDisplayOrigin() {
        Mesh2D.prototype.updateDisplayOrigin.call(this);

        if (this.vertexObjects) {
            this.writeVertexObjectPositions();
        }

        return this;
    },

    setDisplayOrigin(x, y) {
        Mesh2D.prototype.setDisplayOrigin.call(this, x, y);

        if (this.vertexObjects) {
            this.writeVertexObjectPositions();
        }

        return this;
    },

    resetFaceSize() {
        return this.syncVertexObjectsFrame();
    },

    syncVertexObjectsFrame() {
        this.setSizeToFrame();
        this.updateDisplayOrigin();

        var vertexObjects = this.vertexObjects;

        for (var i = 0, cnt = vertexObjects.length; i < cnt; i++) {
            this.updateVertexObjectFrame(vertexObjects[i]);
        }

        return this;
    },

    updateVertexObjectFrame(vertexObject) {
        var frame = this.frame;

        if (!frame) {
            vertexObject.writeToMesh();
            return this;
        }

        vertexObject
            .setFrameSize(frame.cutWidth, frame.cutHeight, frame.x, frame.y)
            .setFrameUV(frame.u0, frame.v0, frame.u1, frame.v1);

        return this;
    },
}
