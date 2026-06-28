import VertexObject from './VertexObject.js';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';

const Mesh2D = PhaserGameObjects.Mesh2D;
const GetCalcMatrix = PhaserGameObjects.GetCalcMatrix;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class Image extends Mesh2D {
    constructor(scene, x, y, key, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', '__DEFAULT');
            frame = GetValue(config, 'frame', null);
        }

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (key === undefined || key === null) { key = '__DEFAULT'; }

        super(scene, x, y, key, [], [], GetValue(config, 'flipV', false));

        this.type = 'rexMeshImage';

        // Keep Mesh2D#vertices as the renderer-facing flat [x, y, u, v] array.
        this.vertexObjects = [];
        this.faceIndices = [];
        this.texturePage = GetValue(config, 'texturePage', 0);
        this.autoBuildOrderedIndices = GetValue(config, 'useOrderedIndices', false);
        this.orderedIndicesStrategy = GetValue(config, 'orderedIndicesStrategy', 2);
        this.debugCallback = null;
        this.debugGraphic = null;

        this.setRenderAsTriangles(GetValue(config, 'renderAsTriangles', false));
        this.setUseOrderedIndices(this.autoBuildOrderedIndices);

        if (frame !== undefined && frame !== null) {
            this.setFrame(frame);
        }

        this.setSizeToFrame();
        this.setOriginFromFrame();
    }

    clear() {
        this.vertexObjects.length = 0;
        this.faceIndices.length = 0;
        this.vertices.length = 0;
        this.indices.length = 0;
        this.indicesOrdered = null;
        this.setUseOrderedIndices(false);
        return this;
    }

    createVertex(u, v) {
        return this.createVertexObject(u, v);
    }

    createVertexObject(u, v) {
        var index = this.vertexObjects.length;
        var vertexObject = new VertexObject(null, index, u, v);

        this.vertexObjects.push(vertexObject);
        this.vertices.push(0, 0, 0, 0);

        vertexObject.setParent(this, index);
        this.updateVertexObjectFrame(vertexObject);

        return vertexObject;
    }

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
    }

    setVertexObjects(vertexObjects) {
        this.vertexObjects.length = 0;
        this.vertices.length = 0;

        for (var i = 0, cnt = vertexObjects.length; i < cnt; i++) {
            this.addVertexObject(vertexObjects[i]);
        }

        return this;
    }

    setFaceIndices(faceIndices, texturePage) {
        if (texturePage === undefined) {
            texturePage = this.texturePage;
        } else {
            this.texturePage = texturePage;
        }

        this.faceIndices.length = 0;
        this.indices.length = 0;

        for (var i = 0, cnt = faceIndices.length; i < cnt; i += 3) {
            var a = faceIndices[i];
            var b = faceIndices[i + 1];
            var c = faceIndices[i + 2];

            this.faceIndices.push(a, b, c);
            this.indices.push(a, b, c, texturePage);
        }

        this.updateOrderedIndices();

        return this;
    }

    setMeshIndices(indices) {
        this.indices.length = 0;
        this.faceIndices.length = 0;

        for (var i = 0, cnt = indices.length; i < cnt; i += 4) {
            this.indices.push(indices[i], indices[i + 1], indices[i + 2], indices[i + 3]);
            this.faceIndices.push(indices[i], indices[i + 1], indices[i + 2]);
        }

        this.updateOrderedIndices();

        return this;
    }

    setUseOrderedIndexOptimization(enabled, strategy) {
        this.autoBuildOrderedIndices = !!enabled;

        if (strategy !== undefined) {
            this.orderedIndicesStrategy = strategy;
        }

        return this.updateOrderedIndices();
    }

    setUseOrderedIndicesOptimization(enabled, strategy) {
        return this.setUseOrderedIndexOptimization(enabled, strategy);
    }

    updateOrderedIndices() {
        if (this.autoBuildOrderedIndices && this.indices.length > 0) {
            this.setRenderAsTriangles(false);
            this.buildOrderedIndices(this.orderedIndicesStrategy, true);
        } else {
            this.setUseOrderedIndices(false);
        }

        return this;
    }

    setTexture(key, frame) {
        super.setTexture(key, frame);

        if (this.vertexObjects) {
            this.syncVertexObjectsFrame();
        }

        return this;
    }

    get frame() {
        return this._frame;
    }

    set frame(value) {
        if (this._frame === value) {
            return;
        }

        this._frame = value;

        if (this.vertexObjects) {
            this.syncVertexObjectsFrame();
        }
    }

    setSizeToFrame(frame) {
        if (!frame) { frame = this.frame; }
        if (!frame) { return this; }

        this.width = frame.realWidth;
        this.height = frame.realHeight;

        return this;
    }

    updateDisplayOrigin() {
        super.updateDisplayOrigin();

        if (this.vertexObjects) {
            this.writeVertexObjectPositions();
        }

        return this;
    }

    setDisplayOrigin(x, y) {
        super.setDisplayOrigin(x, y);

        if (this.vertexObjects) {
            this.writeVertexObjectPositions();
        }

        return this;
    }

    resetVertexObjects() {
        var vertexObjects = this.vertexObjects;

        for (var i = 0, cnt = vertexObjects.length; i < cnt; i++) {
            vertexObjects[i].resetPosition();
        }

        return this;
    }

    resetFaceSize() {
        return this.syncVertexObjectsFrame();
    }

    syncVertexObjectsFrame() {
        this.setSizeToFrame();
        this.updateDisplayOrigin();

        var vertexObjects = this.vertexObjects;

        for (var i = 0, cnt = vertexObjects.length; i < cnt; i++) {
            this.updateVertexObjectFrame(vertexObjects[i]);
        }

        return this;
    }

    writeVertexObjectPositions() {
        var vertexObjects = this.vertexObjects;

        for (var i = 0, cnt = vertexObjects.length; i < cnt; i++) {
            vertexObjects[i].writePositionToMesh();
        }

        return this;
    }

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
    }

    rebuildVerticesFromVertexObjects() {
        var vertexObjects = this.vertexObjects;
        this.vertices.length = vertexObjects.length * 4;

        for (var i = 0, cnt = vertexObjects.length; i < cnt; i++) {
            vertexObjects[i].setParent(this, i);
        }

        return this;
    }

    setDebug(graphic, callback) {
        this.debugGraphic = graphic;

        if (!graphic && !callback) {
            this.debugCallback = null;
        }
        else if (!callback) {
            this.debugCallback = this.renderDebugVerts;
        }
        else {
            this.debugCallback = callback;
        }

        return this;
    }

    renderDebugVerts(src, meshLength, verts) {
        var graphic = src.debugGraphic;

        for (var i = 0; i < meshLength; i += 6) {
            var x0 = verts[i + 0];
            var y0 = verts[i + 1];
            var x1 = verts[i + 2];
            var y1 = verts[i + 3];
            var x2 = verts[i + 4];
            var y2 = verts[i + 5];

            graphic.lineBetween(x0, y0, x1, y1);
            graphic.lineBetween(x1, y1, x2, y2);
            graphic.lineBetween(x2, y2, x0, y0);
        }
    }

    skipRender() {
        return false;
    }

    renderWebGL(renderer, src, drawingContext, parentMatrix) {
        if (!src) {
            src = this;
        }

        if (src.skipRender()) {
            return;
        }

        super.renderWebGL(renderer, src, drawingContext, parentMatrix);

        if (src.debugCallback) {
            src.runDebugCallback(drawingContext, parentMatrix);
        }
    }

    runDebugCallback(drawingContext, parentMatrix) {
        var camera = drawingContext.camera;
        var calcMatrix = GetCalcMatrix(this, camera, parentMatrix, !drawingContext.useCanvas).calc;
        var faceIndices = this.faceIndices;
        var vertexObjects = this.vertexObjects;
        var displayOriginX = this.displayOriginX;
        var displayOriginY = this.displayOriginY;
        var verts = [];

        for (var i = 0, cnt = faceIndices.length; i < cnt; i++) {
            var vertex = vertexObjects[faceIndices[i]];
            var x = vertex.localX - displayOriginX;
            var y = vertex.localY - displayOriginY;

            verts.push(
                calcMatrix.getX(x, y),
                calcMatrix.getY(x, y)
            );
        }

        this.debugCallback.call(this, this, verts.length, verts);

        return this;
    }
}

export default Image;
