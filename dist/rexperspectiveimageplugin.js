(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('phaser')) :
    typeof define === 'function' && define.amd ? define(['phaser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexperspectiveimageplugin = factory(global.Phaser));
})(this, (function (phaser) { 'use strict';

    const RotateAround$3 = phaser.Math.RotateAround;

    var LocalXYToWorldXY = function (gameObject, localX, localY, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = GlobalXY$1;
        }

        var ox = gameObject.displayOriginX;
        var oy = gameObject.displayOriginY;

        out.x = localX - ox;
        out.y = localY - oy;
        RotateAround$3(out, 0, 0, gameObject.rotation);
        out.x *= gameObject.scaleX;
        out.y *= gameObject.scaleY;
        out.x += gameObject.x;
        out.y += gameObject.y;

        return out;
    };

    var WorldXYToLocalXY = function (gameObject, worldX, worldY, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = GlobalXY$1;
        }

        var ox = gameObject.displayOriginX;
        var oy = gameObject.displayOriginY;

        out.x = worldX - gameObject.x;
        out.y = worldY - gameObject.y;
        out.x /= gameObject.scaleX;
        out.y /= gameObject.scaleY;
        RotateAround$3(out, 0, 0, -gameObject.rotation);
        out.x += ox;
        out.y += oy;

        return out;
    };

    var GlobalXY$1 = {};

    const Linear$1 = phaser.Math.Linear;
    const RotateAround$2 = phaser.Math.RotateAround;

    class VertexObject {
        constructor(parent, index, u, v) {
            if (index === undefined) { index = -1; }
            if (u === undefined) { u = 0; }
            if (v === undefined) { v = 0; }

            this.parent = undefined;
            this.index = index;
            this.name = '';

            this.u = u;
            this.v = v;
            this._frameU = 0;
            this._frameV = 0;
            this._frameX = 0;
            this._frameY = 0;
            this._dx = 0;
            this._dy = 0;
            this._localX = 0;
            this._localY = 0;
            this._alpha = 1;
            this._color = 0xffffff;
            this.xyz = [0, 0, 0];

            if (parent) {
                this.setParent(parent, index);
            }
        }

        setParent(parent, index) {
            this.parent = parent;
            if (index !== undefined) {
                this.index = index;
            }
            this.writeToMesh();
            return this;
        }

        setName(name) {
            this.name = name;
            return this;
        }

        get frameU() {
            return this._frameU;
        }

        set frameU(value) {
            if (this._frameU === value) {
                return;
            }
            this._frameU = value;
            this.writeUVToMesh();
        }

        get frameV() {
            return this._frameV;
        }

        set frameV(value) {
            if (this._frameV === value) {
                return;
            }
            this._frameV = value;
            this.writeUVToMesh();
        }

        get frameX() {
            return this._frameX;
        }

        set frameX(value) {
            if (this._frameX === value) {
                return;
            }
            this._frameX = value;
            this._localX = value + this._dx;
            this.writePositionToMesh();
        }

        get frameY() {
            return this._frameY;
        }

        set frameY(value) {
            if (this._frameY === value) {
                return;
            }
            this._frameY = value;
            this._localY = value + this._dy;
            this.writePositionToMesh();
        }

        get localX() {
            return this._localX;
        }

        set localX(value) {
            if (this._localX === value) {
                return;
            }
            this._localX = value;
            this._dx = value - this._frameX;
            this.writePositionToMesh();
        }

        get localY() {
            return this._localY;
        }

        set localY(value) {
            if (this._localY === value) {
                return;
            }
            this._localY = value;
            this._dy = value - this._frameY;
            this.writePositionToMesh();
        }

        get alpha() {
            return this._alpha;
        }

        set alpha(value) {
            this._alpha = value;
        }

        get color() {
            return this._color;
        }

        set color(value) {
            this._color = value;
        }

        setUV(u, v) {
            this.u = u;
            this.v = v;
            return this;
        }

        setFrameUV(frameU0, frameV0, frameU1, frameV1) {
            this.frameU = Linear$1(frameU0, frameU1, this.u);
            this.frameV = Linear$1(frameV0, frameV1, this.v);
            return this;
        }

        setFrameSize(frameWidth, frameHeight, frameX, frameY) {
            if (frameX === undefined) { frameX = 0; }
            if (frameY === undefined) { frameY = 0; }

            this.frameX = frameX + (this.u * frameWidth);
            this.frameY = frameY + (this.v * frameHeight);
            return this;
        }

        resetPosition() {
            this.localX = this.frameX;
            this.localY = this.frameY;
            return this;
        }

        setLocalPosition(x, y) {
            this.localX = x;
            this.localY = y;
            return this;
        }

        rotateAround(ox, oy, rotation) {
            GlobalXY.x = this.localX;
            GlobalXY.y = this.localY;
            RotateAround$2(GlobalXY, ox, oy, rotation);
            this.localX = GlobalXY.x;
            this.localY = GlobalXY.y;
            return this;
        }

        setAlpha(value) {
            this.alpha = value;
            return this;
        }

        setColor(value) {
            this.color = value;
            return this;
        }

        getWorldXY(out) {
            if (this.parent) {
                return LocalXYToWorldXY(this.parent, this.localX, this.localY, out);
            } else {
                return null;
            }
        }

        setWorldXY(x, y) {
            var out = WorldXYToLocalXY(this.parent, x, y, true);
            this.setLocalPosition(out.x, out.y);
            return this;
        }

        setPosition(x, y) {
            this.setWorldXY(x, y);
            return this;
        }

        get x() {
            if (this.parent) {
                return this.getWorldXY(true).x;
            } else {
                return null;
            }
        }

        set x(value) {
            this.setWorldXY(value, this.y);
        }

        get y() {
            if (this.parent) {
                return this.getWorldXY(true).y;
            } else {
                return null;
            }
        }

        set y(value) {
            this.setWorldXY(this.x, value);
        }

        writePositionToMesh() {
            var parent = this.parent;
            if (!parent || this.index < 0) {
                return this;
            }

            var offset = this.index * 4;
            parent.vertices[offset] = this._localX - parent.displayOriginX;
            parent.vertices[offset + 1] = this._localY - parent.displayOriginY;

            return this;
        }

        writeUVToMesh() {
            var parent = this.parent;
            if (!parent || this.index < 0) {
                return this;
            }

            var offset = this.index * 4;
            parent.vertices[offset + 2] = this._frameU;
            parent.vertices[offset + 3] = this._frameV;

            return this;
        }

        writeToMesh() {
            this.writePositionToMesh();
            this.writeUVToMesh();
            return this;
        }
    }

    var GlobalXY = {};

    const Mesh2D = phaser.GameObjects.Mesh2D;
    const GetCalcMatrix = phaser.GameObjects.GetCalcMatrix;
    const IsPlainObject$5 = phaser.Utils.Objects.IsPlainObject;
    const GetValue$e = phaser.Utils.Objects.GetValue;

    let Image$1 = class Image extends Mesh2D {
        constructor(scene, x, y, key, frame, config) {
            if (IsPlainObject$5(x)) {
                config = x;
                x = GetValue$e(config, 'x', 0);
                y = GetValue$e(config, 'y', 0);
                key = GetValue$e(config, 'key', '__DEFAULT');
                frame = GetValue$e(config, 'frame', null);
            }

            if (x === undefined) { x = 0; }
            if (y === undefined) { y = 0; }
            if (key === undefined || key === null) { key = '__DEFAULT'; }

            super(scene, x, y, key, [], [], GetValue$e(config, 'flipV', false));

            this.type = 'rexMeshImage';

            // Keep Mesh2D#vertices as the renderer-facing flat [x, y, u, v] array.
            this.vertexObjects = [];
            this.faceIndices = [];
            this.texturePage = GetValue$e(config, 'texturePage', 0);
            this.autoBuildOrderedIndices = GetValue$e(config, 'useOrderedIndices', false);
            this.orderedIndicesStrategy = GetValue$e(config, 'orderedIndicesStrategy', 2);
            this.debugCallback = null;
            this.debugGraphic = null;

            this.setRenderAsTriangles(GetValue$e(config, 'renderAsTriangles', false));
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
    };

    var AnmiationMethods = {
        play(key, ignoreIfPlaying) {
            return this.anims.play(key, ignoreIfPlaying);
        },

        playReverse(key, ignoreIfPlaying) {
            return this.anims.playReverse(key, ignoreIfPlaying);
        },

        playAfterDelay(key, delay) {
            return this.anims.playAfterDelay(key, delay);
        },

        playAfterRepeat(key, repeatCount) {
            return this.anims.playAfterRepeat(key, repeatCount);
        },

        chain(key) {
            return this.anims.chain(key);
        },

        stop() {
            return this.anims.stop();
        },

        stopAfterDelay(delay) {
            return this.anims.stopAfterDelay(delay);
        },

        stopAfterRepeat(repeatCount) {
            return this.anims.stopAfterRepeat(repeatCount);
        },

        stopOnFrame(frame) {
            return this.anims.stopOnFrame(frame);
        },
    };

    const AnimationState = phaser.Animations.AnimationState;

    class Sprite extends Image$1 {
        constructor(scene, x, y, texture, frame) {
            super(scene, x, y, texture, frame);
            this.type = 'rexMeshSprite';

            this.anims = new AnimationState(this);
        }

        preUpdate(time, delta) {
            this.anims.update(time, delta);
        }

        preDestroy() {
            this.anims.destroy();

            this.anims = undefined;
        }
    }

    Object.assign(
        Sprite.prototype,
        AnmiationMethods,
    );

    var RenderMethods = {
        skipRender() {
            return this.hideBackFace && this.isBackFace;
        }
    };

    var RotateMethods = {
        /*
        this.rotationX, this.rotationY, this.rotationZ,
        this.angleX, this.angleY, this.angleZ
        */ 
        setRotationXYZ(rotationX, rotationY, rotationZ) {
            if (rotationX !== undefined) {
                this.rotationX = rotationX;
            }
            if (rotationY !== undefined) {
                this.rotationY = rotationY;
            }
            if (rotationZ !== undefined) {
                this.rotationZ = rotationZ;
            }
            return this;
        },

        setRotationX(rotationX) {
            this.rotationX = rotationX;
            return this;
        },

        setRotationY(rotationY) {
            this.rotationY = rotationY;
            return this;
        },

        setRotationZ(rotationZ) {
            this.rotationZ = rotationZ;
            return this;
        },

        setAngleXYZ(angleX, angleY, angleZ) {
            if (angleX !== undefined) {
                this.angleX = angleX;
            }
            if (angleY !== undefined) {
                this.angleY = angleY;
            }
            if (angleZ !== undefined) {
                this.angleZ = angleZ;
            }
            return this;
        },

        setAngleX(angleX) {
            this.angleX = angleX;
            return this;
        },

        setAngleXY(angleY) {
            this.angleY = angleY;
            return this;
        },

        setAngleXZ(angleZ) {
            this.angleZ = angleZ;
            return this;
        },
    };

    var Methods = {};

    Object.assign(
        Methods,
        RenderMethods,
        RotateMethods
    );

    var RotateXYZ = function (gameObject, rotationX, rotationY, rotationZ, centerX, centerY) {
        var vertexObjects = gameObject.vertexObjects;

        if (!vertexObjects) {
            return;
        }

        if (rotationX === undefined) { rotationX = 0; }
        if (rotationY === undefined) { rotationY = 0; }
        if (rotationZ === undefined) { rotationZ = 0; }

        if (centerX === undefined) {
            centerX = gameObject.width / 2;
        }
        if (centerY === undefined) {
            centerY = gameObject.height / 2;
        }

        var i, cnt, vertexObject, xyz;

        if ((rotationX === 0) && (rotationY === 0) && (rotationZ === 0)) {
            for (i = 0, cnt = vertexObjects.length; i < cnt; i++) {
                vertexObject = vertexObjects[i];
                vertexObject.resetPosition();

                if (!vertexObject.hasOwnProperty('xyz')) {
                    vertexObject.xyz = [0, 0, 0];
                }

                xyz = vertexObject.xyz;
                xyz[0] = vertexObject.frameX - centerX;
                xyz[1] = vertexObject.frameY - centerY;
                xyz[2] = 0;
            }

        } else {
            var x, y, z, xTemp, yTemp, zTemp;
            var cosX = Math.cos(rotationX),
                sinX = Math.sin(rotationX);
            var cosY = Math.cos(rotationY),
                sinY = Math.sin(rotationY);
            var cosZ = Math.cos(rotationZ),
                sinZ = Math.sin(rotationZ);
            var perspective = gameObject.scene.scale.gameSize.width,
                scale;

            for (i = 0, cnt = vertexObjects.length; i < cnt; i++) {
                vertexObject = vertexObjects[i];
                x = vertexObject.frameX - centerX;
                y = vertexObject.frameY - centerY;
                z = 0;

                // Rotate around x-axis
                yTemp = y * cosX - z * sinX;
                zTemp = y * sinX + z * cosX;
                y = yTemp;
                z = zTemp;

                // Rotate around y-axis
                xTemp = x * cosY + z * sinY;
                zTemp = -x * sinY + z * cosY;
                x = xTemp;
                z = zTemp;

                // Rotate around z-axis
                xTemp = x * cosZ - y * sinZ;
                yTemp = x * sinZ + y * cosZ;
                x = xTemp;
                y = yTemp;

                // Project from 3d to 2d
                scale = perspective / (perspective - z);
                vertexObject.localX = x * scale + centerX;
                vertexObject.localY = y * scale + centerY;

                // Store [x,y,z]
                if (!vertexObject.hasOwnProperty('xyz')) {
                    vertexObject.xyz = [0, 0, 0];
                }
                xyz = vertexObject.xyz;
                xyz[0] = x;
                xyz[1] = y;
                xyz[2] = z;
            }
        }

    };

    var IsBackFace = function (vertexObjects, faceIndices, offset) {
        if (offset === undefined) { offset = 0; }

        if (!vertexObjects || !faceIndices || faceIndices.length < offset + 3) {
            return false;
        }

        var vertex0 = vertexObjects[faceIndices[offset]];
        var vertex1 = vertexObjects[faceIndices[offset + 1]];
        var vertex2 = vertexObjects[faceIndices[offset + 2]];

        if (!vertex0 || !vertex1 || !vertex2) {
            return false;
        }

        var v0 = vertex0.xyz;  // [x,y,z]
        var v1 = vertex1.xyz;  // [x,y,z]
        var v2 = vertex2.xyz;  // [x,y,z]

        if (!v0 || !v1 || !v2) {
            return false;
        }

        var edge1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
        var edge2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];

        var normalZ = edge1[0] * edge2[1] - edge1[1] * edge2[0];

        return normalZ < 0;
    };

    var IsPlainObject$4 = function (obj)
    {
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (typeof(obj) !== 'object' || obj.nodeType || obj === obj.window)
        {
            return false;
        }

        // Support: Firefox <20
        // The try/catch suppresses exceptions thrown when attempting to access
        // the "constructor" property of certain host objects, ie. |window.location|
        // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
        try
        {
            if (obj.constructor && !({}).hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf'))
            {
                return false;
            }
        }
        catch (e)
        {
            return false;
        }

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by {} or constructed with new Object
        return true;
    };

    var GenerateGridVertices = function (gameObject, columns, rows, sharedVertexMode) {
        if (IsPlainObject$4(columns)) {
            var config = columns;
            columns = config.columns;
            rows = config.rows;
            config.sharedVertexMode;
        }

        if (columns === undefined) {
            columns = 1;
        }
        if (rows === undefined) {
            rows = 1;
        }

        var vertexObjects = [];
        var faceIndices = [];

        for (var r = 0; r <= rows; r++) {
            for (var c = 0; c <= columns; c++) {
                vertexObjects.push(gameObject.createVertex(c / columns, r / rows));
            }
        }

        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < columns; c++) {
                var indexTL = (r * (columns + 1)) + c;
                var indexTR = indexTL + 1;
                var indexBL = ((r + 1) * (columns + 1)) + c;
                var indexBR = indexBL + 1;

                faceIndices.push(
                    indexTL, indexBR, indexBL,
                    indexTL, indexTR, indexBR
                );
            }
        }

        gameObject.setFaceIndices(faceIndices);

        return vertexObjects;
    };

    const IsPlainObject$3 = phaser.Utils.Objects.IsPlainObject;
    const GetValue$d = phaser.Utils.Objects.GetValue;
    const RadToDeg$2 = phaser.Math.RadToDeg;
    const DegToRad$3 = phaser.Math.DegToRad;

    class Image extends Sprite {
        constructor(scene, x, y, key, frame, config) {
            if (IsPlainObject$3(x)) {
                config = x;
                x = GetValue$d(config, 'x', 0);
                y = GetValue$d(config, 'y', 0);
                key = GetValue$d(config, 'key', null);
                frame = GetValue$d(config, 'frame', null);
            }

            if (config === undefined) {
                config = {};
            }
            if (config.renderAsTriangles === undefined) {
                config.renderAsTriangles = false;
            }
            if (config.useOrderedIndices === undefined) {
                config.useOrderedIndices = true;
            }
            if (config.orderedIndicesStrategy === undefined) {
                config.orderedIndicesStrategy = 1;
            }

            super(scene, x, y, key, frame, config);
            this.type = 'rexPerspectiveImage';
            this._rotationX = 0;
            this._rotationY = 0;
            this._rotationZ = 0;
            this.isBackFace = false;
            this.hideBackFace = GetValue$d(config, 'hideBackFace', true);

            var gridWidth = GetValue$d(config, 'gridWidth', 0);
            var gridHeight = GetValue$d(config, 'gridHeight', gridWidth);
            this.resetVertices(gridWidth, gridHeight);

        }

        resetVertices(gridWidth, gridHeight) {
            if (gridWidth !== undefined) {
                this.gridWidth = gridWidth;
            }
            if (gridHeight !== undefined) {
                this.gridHeight = gridHeight;
            }

            // Clear faces and vertices
            this.clear();
            if ((this.width === 0) || (this.height === 0)) {
                return this;
            }

            // Generate faces and vertices
            var frameWidth = this.frame.cutWidth,
                frameHeight = this.frame.cutHeight;

            var gridWidth, gridHeight;
            if (this.gridWidth === 0) {
                gridWidth = Math.max(frameWidth / 8, 32);
            } else {
                gridWidth = this.gridWidth;
            }
            if (this.gridHeight === 0) {
                gridHeight = Math.max(frameHeight / 8, 32);
            } else {
                gridHeight = this.gridHeight;
            }

            this
                .addGridFaces({
                    columns: Math.ceil(frameWidth / gridWidth),
                    rows: Math.ceil(frameHeight / gridHeight),
                    sharedVertexMode: true
                });

            this.syncRotation();

            return this;
        }

        addGridFaces(columns, rows, sharedVertexMode) {
            GenerateGridVertices(this, columns, rows);

            return this;
        }

        setSizeToFrame(frame) {
            super.setSizeToFrame(frame);

            if (this._rotationX !== undefined) {
                this.syncRotation();
            }

            return this;
        }

        syncRotation() {
            Rotate(this, this._rotationX, this._rotationY, this._rotationZ);

            return this;
        }

        get rotationX() {
            return this._rotationX;
        }

        set rotationX(value) {
            if (this._rotationX === value) {
                return;
            }

            this._rotationX = value;
            this.syncRotation();
        }

        get angleX() {
            return RadToDeg$2(this.rotationX);
        }

        set angleX(value) {
            this.rotationX = DegToRad$3(value);
        }

        get rotationY() {
            return this._rotationY;
        }

        set rotationY(value) {
            if (this._rotationY === value) {
                return;
            }

            this._rotationY = value;
            this.syncRotation();
        }

        get angleY() {
            return RadToDeg$2(this.rotationY);
        }

        set angleY(value) {
            this.rotationY = DegToRad$3(value);
        }

        get rotationZ() {
            return this._rotationZ;
        }

        set rotationZ(value) {
            if (this._rotationZ === value) {
                return;
            }

            this._rotationZ = value;
            this.syncRotation();
        }

        get angleZ() {
            return RadToDeg$2(this.rotationZ);
        }

        set angleZ(value) {
            this.rotationZ = DegToRad$3(value);
        }
    }

    var Rotate = function (gameObject, rotationX, rotationY, rotationZ) {
        RotateXYZ(gameObject, rotationX, rotationY, rotationZ);
        if (gameObject.faceIndices.length > 0) {
            gameObject.isBackFace = IsBackFace(gameObject.vertexObjects, gameObject.faceIndices, 0);
        } else {
            gameObject.isBackFace = false;
        }
    };

    Object.assign(
        Image.prototype,
        Methods
    );

    function PerspectiveImageFactory (x, y, texture, frame, config) {
        var gameObject = new Image(this.scene, x, y, texture, frame, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue$2 = phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject$2 = phaser.GameObjects.BuildGameObject;

    function PerspectiveImageCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var key = GetAdvancedValue$2(config, 'key', null);
        var frame = GetAdvancedValue$2(config, 'frame', null);
        var gameObject = new Image(this.scene, 0, 0, key, frame, config);
        BuildGameObject$2(this.scene, gameObject, config);

        return gameObject;
    }

    const DynamicTexture = phaser.Textures.DynamicTexture;

    var CreateDynamicTexture = function (scene, width, height) {
        if (width === undefined) {
            width = 2;
        }
        if (height === undefined) {
            height = 2;
        }
        var dt = new DynamicTexture(scene.sys.textures, null, width, height);
        return dt;
    };

    var GetDisplayWidth = function (gameObject) {
        if (gameObject.displayWidth !== undefined) {
            return gameObject.displayWidth;
        } else {
            return gameObject.width;
        }
    };

    var GetDisplayHeight = function (gameObject) {
        if (gameObject.displayHeight !== undefined) {
            return gameObject.displayHeight;
        } else {
            return gameObject.height;
        }
    };

    const Rectangle$1 = phaser.Geom.Rectangle;
    const Vector2 = phaser.Math.Vector2;
    const RotateAround$1 = phaser.Math.RotateAround;
    const P3Container$1 = phaser.GameObjects.Container;

    var GetBounds = function (gameObject, output) {
        if (output === undefined) {
            output = new Rectangle$1();
        } else if (output === true) {
            if (GlobRect$1 === undefined) {
                GlobRect$1 = new Rectangle$1();
            }
            output = GlobRect$1;
        }

        if (gameObject.getBounds && !(gameObject instanceof P3Container$1)) {
            return gameObject.getBounds(output);
        }

        //  We can use the output object to temporarily store the x/y coords in:

        var TLx, TLy, TRx, TRy, BLx, BLy, BRx, BRy;

        // Instead of doing a check if parent container is
        // defined per corner we only do it once.
        if (gameObject.parentContainer) {
            var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

            GetTopLeft(gameObject, output);
            parentMatrix.transformPoint(output.x, output.y, output);

            TLx = output.x;
            TLy = output.y;

            GetTopRight(gameObject, output);
            parentMatrix.transformPoint(output.x, output.y, output);

            TRx = output.x;
            TRy = output.y;

            GetBottomLeft(gameObject, output);        parentMatrix.transformPoint(output.x, output.y, output);

            BLx = output.x;
            BLy = output.y;

            GetBottomRight(gameObject, output);
            parentMatrix.transformPoint(output.x, output.y, output);

            BRx = output.x;
            BRy = output.y;
        }
        else {
            GetTopLeft(gameObject, output);

            TLx = output.x;
            TLy = output.y;

            GetTopRight(gameObject, output);
            TRx = output.x;
            TRy = output.y;

            GetBottomLeft(gameObject, output);
            BLx = output.x;
            BLy = output.y;

            GetBottomRight(gameObject, output);

            BRx = output.x;
            BRy = output.y;
        }

        output.x = Math.min(TLx, TRx, BLx, BRx);
        output.y = Math.min(TLy, TRy, BLy, BRy);
        output.width = Math.max(TLx, TRx, BLx, BRx) - output.x;
        output.height = Math.max(TLy, TRy, BLy, BRy) - output.y;

        return output;
    };

    var GlobRect$1 = undefined;

    var GetTopLeft = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getTopLeft) {
            return gameObject.getTopLeft(output, includeParent);
        }

        output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
        output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetTopRight = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getTopRight) {
            return gameObject.getTopRight(output, includeParent);
        }

        output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
        output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetBottomLeft = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getBottomLeft) {
            return gameObject.getBottomLeft(output, includeParent);
        }

        output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
        output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetBottomRight = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getBottomRight) {
            return gameObject.getBottomRight(output, includeParent);
        }

        output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
        output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GlobVector = undefined;

    var PrepareBoundsOutput = function (gameObject, output, includeParent) {
        if (includeParent === undefined) { includeParent = false; }

        if (gameObject.rotation !== 0) {
            RotateAround$1(output, gameObject.x, gameObject.y, gameObject.rotation);
        }

        if (includeParent && gameObject.parentContainer) {
            var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

            parentMatrix.transformPoint(output.x, output.y, output);
        }

        return output;
    };

    const Rectangle = phaser.Geom.Rectangle;
    const Union = phaser.Geom.Rectangle.Union;

    var GetBoundsOfGameObjects = function (gameObjects, out) {
        if (out === undefined) {
            out = new Rectangle();
        } else if (out === true) {
            if (GlobRect === undefined) {
                GlobRect = new Rectangle();
            }
            out = GlobRect;
        }

        out.setTo(0, 0, 0, 0);

        var gameObject;
        var firstClone = true;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            gameObject = gameObjects[i];
            if (!gameObject.getBounds) {
                continue;
            }

            var boundsRect = GetBounds(gameObject, true);

            if (firstClone) {
                out.setTo(boundsRect.x, boundsRect.y, boundsRect.width, boundsRect.height);
                firstClone = false;
            } else {
                Union(boundsRect, out, out);
            }
        }

        return out;
    };

    var GlobRect;

    var Clear = function (obj) {
        if ((typeof (obj) !== 'object') || (obj === null)) {
            return obj;
        }

        if (Array.isArray(obj)) {
            obj.length = 0;
        } else {
            for (var key in obj) {
                delete obj[key];
            }
        }

        return obj;
    };

    /**
     * Shallow Object Clone. Will not out nested objects.
     * @param {object} obj JSON object
     * @param {object} ret JSON object to return, set null to return a new object
     * @returns {object} this object
     */
    var Clone = function (obj, out) {
        var objIsArray = Array.isArray(obj);

        if (out === undefined) {
            out = (objIsArray) ? [] : {};
        } else {
            Clear(out);
        }

        if (objIsArray) {
            out.length = obj.length;
            for (var i = 0, cnt = obj.length; i < cnt; i++) {
                out[i] = obj[i];
            }
        } else {
            for (var key in obj) {
                out[key] = obj[key];
            }
        }

        return out;
    };

    var SortGameObjectsByDepth = function (gameObjects, descending) {
        if (gameObjects.length <= 1) {
            return gameObjects;
        }

        if (descending === undefined) {
            descending = false;
        }

        var itemList;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var gameObject = gameObjects[i];
            if (gameObject.displayList) {
                // Inside a scene or a layer
                itemList = gameObject.displayList; // displayList
            } else if (gameObject.parentContainer) {
                // Inside a container
                itemList = gameObject.parentContainer.list; // array
            }

            if (itemList) {
                break;
            }
        }

        if (!itemList) {
            itemList = gameObject.scene.sys.displayList;  // displayList
            // ??
        }

        if (itemList.depthSort) {
            // Is a displayList object
            itemList.depthSort();
            itemList = itemList.list;
            // itemList is an array now
        }

        // itemList is an array
        if (descending) {
            gameObjects.sort(function (childA, childB) {
                return itemList.indexOf(childB) - itemList.indexOf(childA);
            });

        } else {
            gameObjects.sort(function (childA, childB) {
                return itemList.indexOf(childA) - itemList.indexOf(childB);
            });

        }

        return gameObjects;
    };

    const GameObjectClass = phaser.GameObjects.GameObject;
    const LayerClass$1 = phaser.GameObjects.Layer;

    var IsGameObject = function (object) {
        return (object instanceof GameObjectClass) || (object instanceof LayerClass$1);
    };

    var GetValue$c = phaser.Utils.Objects.GetValue;

    var Snapshot = function (config) {
        if (!config) {
            return;
        }

        var gameObjects = config.gameObjects;
        if (!Array.isArray(gameObjects)) {
            gameObjects = [gameObjects];
        }
        var renderTexture = config.renderTexture;  // renderTexture, or dynamicTexture
        var saveTexture = config.saveTexture;
        var x = GetValue$c(config, 'x', undefined);
        var y = GetValue$c(config, 'y', undefined);
        var width = GetValue$c(config, 'width', undefined);
        var height = GetValue$c(config, 'height', undefined);
        var originX = GetValue$c(config, 'originX', 0);
        var originY = GetValue$c(config, 'originY', 0);
        var padding = GetValue$c(config, 'padding', 0);

        var scrollX, scrollY;
        if ((width === undefined) || (height === undefined) || (x === undefined) || (y === undefined)) {
            // Union bounds of gameObjects
            var bounds = GetBoundsOfGameObjects(gameObjects, true);
            var isCenterOrigin = (x !== undefined) && (y !== undefined);
            if (isCenterOrigin) {
                width = Math.max((x - bounds.left), (bounds.right - x)) * 2;
                height = Math.max((y - bounds.top), (bounds.bottom - y)) * 2;
                originX = 0.5;
                originY = 0.5;
            } else {
                x = bounds.x;
                y = bounds.y;
                width = bounds.width;
                height = bounds.height;
                originX = 0;
                originY = 0;
            }
            scrollX = bounds.x;
            scrollY = bounds.y;
        } else {
            scrollX = x + ((0 - originX) * width);
            scrollY = y + ((0 - originY) * height);
        }

        scrollX -= padding;
        scrollY -= padding;
        width += (padding * 2);
        height += (padding * 2);

        var scene = gameObjects[0].scene;
        var textureManager = scene.sys.textures;

        // Snapshot on dynamicTexture directly
        if (saveTexture && !renderTexture) {
            renderTexture = textureManager.addDynamicTexture(saveTexture, width, height);
        }

        // Return a renderTexture
        if (!renderTexture) {
            renderTexture = scene.add.renderTexture(0, 0, width, height);
        }

        if (renderTexture.setPosition) {
            renderTexture.setPosition(x, y);
        }

        if ((renderTexture.width !== width) || (renderTexture.height !== height)) {
            renderTexture.setSize(width, height);
        }

        if (renderTexture.setOrigin) {
            renderTexture.setOrigin(originX, originY);
        }

        renderTexture.camera.setScroll(scrollX, scrollY);

        // Draw gameObjects
        gameObjects = SortGameObjectsByDepth(Clone(gameObjects));
        renderTexture.draw(gameObjects).render();

        // Save render result to texture
        if (saveTexture) {
            if (IsGameObject(renderTexture)) {
                renderTexture.saveTexture(saveTexture);
            } else if (renderTexture.key !== saveTexture) {
                textureManager.renameTexture(renderTexture.key, key);
            }
        }

        return renderTexture;
    };

    var InstallRTSetSizeHook = function (rt, callback) {
        var setSize = rt.setSize;

        rt.setSize = function (width, height, forceEven) {
            var result = setSize.call(this, width, height, forceEven);
            callback();
            return result;
        };
    };

    const IsPlainObject$2 = phaser.Utils.Objects.IsPlainObject;
    const GetValue$b = phaser.Utils.Objects.GetValue;

    let RenderTexture$1 = class RenderTexture extends Image {
        constructor(scene, x, y, width, height, config) {
            if (IsPlainObject$2(x)) {
                config = x;
                x = GetValue$b(config, 'x', 0);
                y = GetValue$b(config, 'y', 0);
                width = GetValue$b(config, 'width', 32);
                height = GetValue$b(config, 'height', 32);
            }

            // Dynamic-texture -> quad-image
            var texture = CreateDynamicTexture(scene, width, height);

            super(scene, x, y, texture, null, config);
            this.type = 'rexPerspectiveRenderTexture';
            this.rt = this.texture;

            var self = this;
            InstallRTSetSizeHook(this.rt, function () {
                self.setSizeToFrame();
            });
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            super.destroy(fromScene);

            this.rt.destroy();
            this.rt = null;
        }

        setSizeToFrame(frame) {
            var width = this.width;
            var height = this.height;

            super.setSizeToFrame(frame);

            this.updateDisplayOrigin();

            if ((this.width !== width) || (this.height !== height)) {
                if (this.gridWidth !== undefined) {
                    this.resetVertices();
                }
            }

            return this;
        }

        snapshot(gameObjects, config) {
            if (config === undefined) {
                config = {};
            }
            config.gameObjects = gameObjects;
            config.renderTexture = this.rt;

            Snapshot(config);

            this.setSizeToFrame();

            return this;
        }
    };

    function PerspectiveRenderTextureFactory (x, y, width, height, config) {
        var gameObject = new RenderTexture$1(this.scene, x, y, width, height, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue$1 = phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject$1 = phaser.GameObjects.BuildGameObject;

    function PerspectiveRenderTextureCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var width = GetAdvancedValue$1(config, 'width', 32);
        var height = GetAdvancedValue$1(config, 'height', 32);
        var gameObject = new RenderTexture$1(this.scene, 0, 0, width, height, config);
        BuildGameObject$1(this.scene, gameObject, config);

        return gameObject;
    }

    const MainVersionNumber = 4;
    const SubVersionNumber = 0;

    var IsChecked = false;

    var CheckP3Version = function (minVersion) {
        if (IsChecked) {
            return;
        }

        if (minVersion === undefined) {
            minVersion = SubVersionNumber;
        }
        var version = phaser.VERSION.split('.');
        var mainVersion = parseInt(version[0]);
        if (mainVersion === MainVersionNumber) {
            var subVersion = parseInt(version[1]);
            if (subVersion < minVersion) {
                console.error(`Minimum supported version : ${mainVersion}.${subVersion}`);
            }
        } else {
            console.error(`Can't supported version : ${mainVersion}`);
        }

        IsChecked = true;
    };

    const SKIP_CHECK_BLEND_MODE$1 = phaser.BlendModes.SKIP_CHECK;

    var WebGLRenderer = function (renderer, container, drawingContext, parentMatrix, renderStep, displayList, displayListIndex) {
        var camera = drawingContext.camera;
        camera.addToRenderList(container);

        if (!container.layerRendererEnable) {
            return;
        }

        // Won't apply container's alpha to children

        var rendererLayer = container.rendererLayer;

        if (!rendererLayer) {
            return;
        }

        var children = rendererLayer.list;
        var childCount = children.length;

        if (childCount === 0) {
            return;
        }

        var currentContext = drawingContext;

        rendererLayer.depthSort();

        var layerHasBlendMode = (container.blendMode !== SKIP_CHECK_BLEND_MODE$1);
        var useStencilChildrenMask = container.childrenMaskGameObject && container.useStencilChildrenMask;

        if (!layerHasBlendMode && currentContext.blendMode !== 0) {
            //  If Layer is SKIP_CHECK then set blend mode to Normal
            currentContext = currentContext.getClone();
            currentContext.setBlendMode(0);
            currentContext.use();
        }

        if (useStencilChildrenMask) {
            PushStencilMask(renderer, container.childrenMaskGameObject, currentContext);
        }

        for (var i = 0; i < childCount; i++) {
            var child = children[i];

            if (!child.willRender(camera)) {
                continue;
            }

            if (
                !layerHasBlendMode &&
                child.blendMode !== currentContext.blendMode &&
                child.blendMode !== SKIP_CHECK_BLEND_MODE$1
            ) {
                //  If Layer doesn't have its own blend mode, then a child can have one
                currentContext = currentContext.getClone();
                currentContext.setBlendMode(child.blendMode);
                currentContext.use();
            }

            child.renderWebGLStep(renderer, child, currentContext, undefined, undefined, children, i);
        }

        if (useStencilChildrenMask) {
            PopStencilMask(renderer, container.childrenMaskGameObject, currentContext);
        }

        // Release any remaining context.
        if (currentContext !== drawingContext) {
            currentContext.release();
        }
    };

    var PushStencilMask = function (renderer, maskGameObject, drawingContext) {
        RenderStencilMask(renderer, maskGameObject, drawingContext, true);
    };

    var PopStencilMask = function (renderer, maskGameObject, drawingContext) {
        RenderStencilMask(renderer, maskGameObject, drawingContext, false);
    };

    var RenderStencilMask = function (renderer, maskGameObject, drawingContext, push) {
        var gl = renderer.gl;
        var opIncr = gl.INCR_WRAP;
        var opDecr = gl.DECR_WRAP;
        var fillOp = (push) ? opIncr : opDecr;
        var maskOp = (push) ? opDecr : opIncr;

        var currentContext = drawingContext.getClone();

        currentContext.setAlphaStrategy(renderer.config.stencilAlphaStrategy);
        currentContext.setColorWritemask(false, false, false, false);
        currentContext.setStencil(true, gl.ALWAYS, 0, 0xFF, fillOp, fillOp, fillOp, 0, 0xFF);
        currentContext.use();

        // Push adds a blocking layer everywhere, then removes it inside the mask.
        // Pop applies the inverse operations to restore the previous stencil state.
        renderer.renderNodes.getNode('FillCamera').run(currentContext, 0xff000000, drawingContext.useCanvas);

        currentContext = currentContext.getClone();
        currentContext.use();

        currentContext.setStencil(true, gl.ALWAYS, 0, 0xFF, maskOp, maskOp, maskOp, 0, 0xFF);

        maskGameObject.renderWebGLStep(renderer, maskGameObject, currentContext);

        currentContext.release();
    };

    var CanvasRenderer = function (renderer, container, camera) {
        camera.addToRenderList(container);

        if (!container.layerRendererEnable) {
            return;
        }

        // Won't apply container's alpha to children

        var rendererLayer = container.rendererLayer;

        if (!rendererLayer) {
            return;
        }

        var children = rendererLayer.list;

        if (children.length === 0) {
            return;
        }

        rendererLayer.depthSort();

        var layerHasBlendMode = (container.blendMode !== -1);

        if (!layerHasBlendMode) {
            //  If Layer is SKIP_TEST then set blend mode to be Normal
            renderer.setBlendMode(0);
        }

        if (container.mask) {
            container.mask.preRenderCanvas(renderer, null, camera);
        }

        for (var i = 0; i < children.length; i++) {
            var child = children[i];

            if (!child.willRender(camera)) {
                continue;
            }

            if (!layerHasBlendMode && child.blendMode !== renderer.currentBlendMode) {
                //  If Layer doesn't have its own blend mode, then a child can have one
                renderer.setBlendMode(child.blendMode);
            }

            //  Render
            child.renderCanvas(renderer, child, camera);
        }

        if (container.mask) {
            container.mask.postRenderCanvas(renderer);
        }
    };

    var Renderer = {
        renderWebGL: WebGLRenderer,
        renderCanvas: CanvasRenderer

    };

    const List = phaser.Structs.List;
    const StableSort = phaser.Utils.Array.StableSort;
    const GameObjectEvents = phaser.GameObjects.Events;
    const SceneEvents = phaser.Scenes.Events;

    class ChildrenDisplayList extends List {
        constructor(parent) {
            super(parent.scene);

            this.parent = parent;
            this.scene = parent.scene;
            this.events = this.scene.sys.events;
            this.active = false;
            this.isRexContainerLiteLayer = true;
            this.sortChildrenFlag = false;

            this.addCallback = this.addChildCallback;
            this.removeCallback = this.removeChildCallback;
        }

        addChildCallback(gameObject) {
            var displayList = gameObject.displayList;

            if (displayList && displayList !== this) {
                gameObject.removeFromDisplayList();
            }

            if (gameObject.parentContainer) {
                gameObject.parentContainer.remove(gameObject);
            }

            if (!gameObject.displayList) {
                this.queueDepthSort();

                gameObject.displayList = this;

                gameObject.emit(GameObjectEvents.ADDED_TO_SCENE, gameObject, this.scene);
                this.events.emit(SceneEvents.ADDED_TO_SCENE, gameObject, this.scene);
            }
        }

        removeChildCallback(gameObject) {
            this.queueDepthSort();

            if (gameObject.displayList === this) {
                gameObject.displayList = null;
            }

            gameObject.emit(GameObjectEvents.REMOVED_FROM_SCENE, gameObject, this.scene);
            this.events.emit(SceneEvents.REMOVED_FROM_SCENE, gameObject, this.scene);
        }

        queueDepthSort() {
            this.sortChildrenFlag = true;
            return this;
        }

        depthSort() {
            if (!this.sortChildrenFlag || this.list.length < 2) {
                this.sortChildrenFlag = false;
                return this;
            }

            StableSort(this.list, this.sortByDepth);
            this.sortChildrenFlag = false;

            return this;
        }

        sortByDepth(childA, childB) {
            return childA._depth - childB._depth;
        }
    }

    const DegToRad$2 = phaser.Math.DegToRad;
    const RadToDeg$1 = phaser.Math.RadToDeg;

    var GetLocalState = function (gameObject) {
        if (!gameObject.hasOwnProperty('rexContainer')) {
            var rexContainer = {
                parent: null, self: null, layer: null,
                x: 0, y: 0, syncPosition: true,
                rotation: 0, syncRotation: true,
                scaleX: 0, scaleY: 0, syncScale: true,
                alpha: 0, syncAlpha: true,
                syncScrollFactor: true,
                syncCameraFilter: true,
                syncDisplayList: true,
                visible: true,
                active: true,
            };

            Object.defineProperty(rexContainer, 'angle', {
                get: function () {
                    return RadToDeg$1(this.rotation);
                },
                set: function (value) {
                    this.rotation = DegToRad$2(value);
                }
            });
            Object.defineProperty(rexContainer, 'displayWidth', {
                get: function () {
                    return gameObject.width * this.scaleX;
                },
                set: function (width) {
                    this.scaleX = width / gameObject.width;
                }
            });
            Object.defineProperty(rexContainer, 'displayHeight', {
                get: function () {
                    return gameObject.height * this.scaleY;
                },
                set: function (height) {
                    this.scaleY = height / gameObject.height;
                }
            });

            gameObject.rexContainer = rexContainer;
        }
        return gameObject.rexContainer;
    };

    var GetSourceList = function (gameObject) {
        if (gameObject.displayList) {
            return gameObject.displayList;  // At scene's displayList or at a layer
        } else if (gameObject.parentContainer) {
            return gameObject.parentContainer.list;  // At a container
        }

        return null;
    };

    var GetValidChildren = function (parent, includeParent) {
        if (includeParent === undefined) {
            includeParent = true;
        }

        var children = parent.getAllChildren(includeParent ? [parent] : undefined);
        var parentList = includeParent ? GetSourceList(parent) : null;
        var targetList = parentList;

        children = children.filter(function (gameObject) {
            var sourceList = GetSourceList(gameObject);

            if (!sourceList) {
                return false;
            }

            if (!targetList) {
                targetList = sourceList;
            }

            return (sourceList === targetList);
        });

        return children;
    };

    var SetLayerState = function (gameObjects, layer) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            GetLocalState(gameObjects[i]).layer = layer;
        }
    };

    var AddToContainer = function (p3Container, config) {
        if (config === undefined) {
            config = {};
        }
        var {
            includeParent = false,
            setLayerState = false,
            clearDepthSort = false
        } = config;

        var gameObjects = GetValidChildren(this, includeParent);

        SortGameObjectsByDepth(gameObjects);

        p3Container.add(gameObjects);

        if (setLayerState) {
            SetLayerState(gameObjects, p3Container);
        }

        if (clearDepthSort) {
            p3Container.sortChildrenFlag = false;
        }

        return gameObjects;
    };

    CheckP3Version();
    const Zone = phaser.GameObjects.Zone;
    const AddItem = phaser.Utils.Array.Add;
    const RemoveItem = phaser.Utils.Array.Remove;
    const SKIP_CHECK_BLEND_MODE = phaser.BlendModes.SKIP_CHECK;

    class Base extends Zone {
        constructor(scene, x, y, width, height) {
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }
            if (width === undefined) {
                width = 1;
            }
            if (height === undefined) {
                height = 1;
            }
            super(scene, x, y, width, height);
            this.children = [];

            /*
            Internal layer-like renderer
            All children will be put into this internal layer, instead of displayList of scene,
            and Base/ContainerLite will be very bottom of all children
            */
            this.layerRendererEnable = false;
            this.rendererLayer = undefined;

            this.setBlendMode(SKIP_CHECK_BLEND_MODE);
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            if (fromScene) {
                // Stop scene
                var child;
                for (var i = this.children.length - 1; i >= 0; i--) {
                    child = this.children[i];
                    if (!child.parentContainer &&  // Not in container
                        (
                            !child.displayList ||   // Not in any display list
                            (child.displayList === this.rendererLayer) // In internal children display list
                        )
                    ) {
                        // Destroy child which is not in scene, container, or layer manually
                        child.destroy(fromScene);
                    }
                }
            }

            // Destroy/remove children
            this.clear(!fromScene);
            super.destroy(fromScene);

            this.rendererLayer = undefined;
        }

        contains(gameObject) {
            return (this.children.indexOf(gameObject) !== -1);
        }

        add(gameObjects) {
            AddItem(this.children, gameObjects, 0,
                // Callback of item added
                function (gameObject) {
                    gameObject.once('destroy', this.onChildDestroy, this);
                    this.addChildCallback(gameObject);
                }, this);
            return this;
        }

        remove(gameObjects, destroyChild) {
            RemoveItem(this.children, gameObjects,
                // Callback of item removed
                function (gameObject) {
                    gameObject.off('destroy', this.onChildDestroy, this);
                    this.removeChildCallback(gameObject, destroyChild);
                    if (destroyChild) {
                        gameObject.destroy();
                    }
                }, this);
            return this;
        }

        // Overwrite it
        addChildCallback(gameObject) {
            var layer = this.rendererLayer;
            if (layer) {
                layer.add(gameObject); // will invoke rendererLayer.queueDepthSort()
            }
        }

        // Overwrite it
        removeChildCallback(gameObject, destroyChild) {
            var layer = this.rendererLayer;
            if (layer) {
                layer.remove(gameObject); // will invoke rendererLayer.queueDepthSort()
            }
        }

        onChildDestroy(child, fromScene) {
            // Only remove reference
            this.remove(child, false);
        }

        clear(destroyChild) {
            var gameObject;
            var children = this.children.slice();
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                gameObject = children[i];

                if (!gameObject) {
                    continue;
                }

                gameObject.off('destroy', this.onChildDestroy, this);
                this.removeChildCallback(gameObject, destroyChild);
                if (destroyChild) {
                    gameObject.destroy();
                }
            }
            this.children.length = 0;

            return this;
        }

        enableLayerRenderer() {
            if (this.layerRendererEnable) {
                return this;
            }

            this.layerRendererEnable = true;

            var rendererLayer = new ChildrenDisplayList(this);

            this.rendererLayer = rendererLayer;

            AddToContainer.call(this, rendererLayer, {
                includeParent: false,
                setLayerState: true,
                clearDepthSort: true,
            });

            return this;
        }

        enableFilters() {
            if (this.filterCamera || !this.scene.renderer.gl) {
                return this;
            }

            this.enableLayerRenderer();

            /*
            Layer renderer requires filtersFocusContext=true 
            to avoid object-bounds clipping when using any filter.
            */
            this.setFiltersFocusContext(true);

            super.enableFilters();

            return this;
        }
    }

    const Components = phaser.GameObjects.Components;
    phaser.Class.mixin(Base,
        [
            Components.Alpha,
            Components.Flip
        ]
    );

    Object.assign(
        Base.prototype,
        Renderer,
    );

    var GetParent = function (gameObject, name) {
        var parent;
        if (name === undefined) {
            if (gameObject.hasOwnProperty('rexContainer')) {
                parent = gameObject.rexContainer.parent;
            }
        } else {
            parent = GetParent(gameObject);
            while (parent) {
                if (parent.name === name) {
                    break;
                }
                parent = GetParent(parent);
            }
        }
        return parent;
    };

    var GetTopmostParent = function (gameObject) {
        var parent = GetParent(gameObject);
        while (parent) {
            gameObject = parent;
            parent = GetParent(parent);
        }
        return gameObject;
    };

    var Parent = {
        setParent(gameObject, parent) {
            if (parent === undefined) {
                parent = this;
            }
            var localState = GetLocalState(gameObject);
            if (parent) { // Add to parent
                localState.parent = parent;
                localState.self = gameObject;
            } else { // Remove from parent
                localState.parent = null;
                localState.self = null;
            }
            return this;
        },

        getParent(gameObject, name) {
            if (typeof (gameObject) === 'string') {
                name = gameObject;
                gameObject = undefined;
            }
            if (gameObject === undefined) {
                gameObject = this;
            }
            return GetParent(gameObject, name);
        },

        getTopmostParent(gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }
            return GetTopmostParent(gameObject);
        }
    };

    const GetValue$a = phaser.Utils.Objects.GetValue;
    const BaseAdd = Base.prototype.add;

    var Add = function (gameObject, config) {
        this.setParent(gameObject);

        var state = GetLocalState(gameObject);
        SetupSyncFlags(state, config);

        this
            .resetChildState(gameObject)           // Reset local state of child
            .updateChildVisible(gameObject)        // Apply parent's visible to child
            .updateChildActive(gameObject)         // Apply parent's active to child
            .updateChildScrollFactor(gameObject)   // Apply parent's scroll factor to child
            .updateChildMask(gameObject)           // Apply parent's mask to child
            .updateCameraFilter(gameObject);       // Apply parent's cameraFilter to child

        BaseAdd.call(this, gameObject);

        SyncDisplayList.call(this, gameObject, state);

        return this;
    };

    var AddLocal = function (gameObject, config) {
        this.setParent(gameObject);

        // Set local state from child directly
        var state = GetLocalState(gameObject);
        SetupSyncFlags(state, config);
        // Position
        state.x = gameObject.x;
        state.y = gameObject.y;
        state.rotation = gameObject.rotation;
        state.scaleX = gameObject.scaleX;
        state.scaleY = gameObject.scaleY;
        // Alpha
        state.alpha = gameObject.alpha;
        // Visible
        state.visible = gameObject.visible;
        // Active
        state.active = gameObject.active;

        this
            .updateChildPosition(gameObject)
            .updateChildAlpha(gameObject)
            .updateChildVisible(gameObject)        // Apply parent's visible to child
            .updateChildActive(gameObject)         // Apply parent's active to child
            .updateChildScrollFactor(gameObject)   // Apply parent's scroll factor to child
            .updateChildMask(gameObject);          // Apply parent's mask to child

        BaseAdd.call(this, gameObject);

        SyncDisplayList.call(this, gameObject, state);

        return this;
    };

    var SetupSyncFlags = function (state, config) {
        if (config === undefined) {
            config = true;
        }

        if (typeof (config) === 'boolean') {
            state.syncPosition = config;
            state.syncRotation = config;
            state.syncScale = config;
            state.syncAlpha = config;
            state.syncScrollFactor = config;
            state.syncCameraFilter = config;
            state.syncDisplayList = config;
        } else {
            state.syncPosition = GetValue$a(config, 'syncPosition', true);
            state.syncRotation = GetValue$a(config, 'syncRotation', true);
            state.syncScale = GetValue$a(config, 'syncScale', true);
            state.syncAlpha = GetValue$a(config, 'syncAlpha', true);
            state.syncScrollFactor = GetValue$a(config, 'syncScrollFactor', true);
            state.syncCameraFilter = GetValue$a(config, 'syncCameraFilter', true);
            state.syncDisplayList = GetValue$a(config, 'syncDisplayList', true);
        }

    };

    var SyncDisplayList = function (gameObject, state) {
        this.addToParentContainer(gameObject);     // Sync parent's container to child

        if (state.syncDisplayList) {
            this.addToPatentLayer(gameObject);     // Sync parent's layer to child
        }
    };

    var AddChild = {
        // Can override this method
        add(gameObject) {
            if (Array.isArray(gameObject)) {
                this.addMultiple(gameObject);
            } else {
                Add.call(this, gameObject);
            }
            return this;
        },

        // Don't override this method
        pin(gameObject, config) {
            if (Array.isArray(gameObject)) {
                this.addMultiple(gameObject, config);
            } else {
                Add.call(this, gameObject, config);
            }
            return this;
        },

        // Can override this method
        addMultiple(gameObjects) {
            var args = Array.from(arguments);
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                args[0] = gameObjects[i];
                this.add.apply(this, args);
            }
            return this;
        },

        addLocal(gameObject) {
            if (Array.isArray(gameObject)) {
                this.addMultiple(gameObject);
            } else {
                AddLocal.call(this, gameObject);
            }
            return this;
        },

        // Don't override this method
        pinLocal(gameObject, config) {
            if (Array.isArray(gameObject)) {
                this.addMultiple(gameObject, config);
            } else {
                AddLocal.call(this, gameObject, config);
            }
            return this;
        },

        addLocalMultiple(gameObjects) {
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                AddLocal.call(this, gameObjects[i]);
            }
            return this;
        }
    };

    const BaseRemove = Base.prototype.remove;
    const BaseClear = Base.prototype.clear;

    var RemoveChild = {
        // Can override this method
        remove(gameObject, destroyChild) {
            if (GetParent(gameObject) !== this) {
                return this;
            }
            this.setParent(gameObject, null);

            BaseRemove.call(this, gameObject, destroyChild);
            return this;
        },

        // Don't override this method
        unpin(gameObject, destroyChild) {
            if (GetParent(gameObject) !== this) {
                return this;
            }
            this.setParent(gameObject, null);

            BaseRemove.call(this, gameObject, destroyChild);
            return this;
        },

        clear(destroyChild) {
            var children = this.children;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                this.setParent(child, null);
            }
            BaseClear.call(this, destroyChild);
            return this;
        },
    };

    var ChildState = {
        getLocalState(gameObject) {
            return GetLocalState(gameObject);
        },

        resetChildState(gameObject) {
            this
                .resetChildPositionState(gameObject)
                .resetChildVisibleState(gameObject)
                .resetChildAlphaState(gameObject)
                .resetChildActiveState(gameObject);
            return this;
        },

        resetChildrenState(gameObjects) {
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.resetChildState(gameObjects[i]);
            }
            return this;
        },

        syncProperties() {
            this
                .syncPosition()
                .syncVisible()
                .syncAlpha()
                .syncActive()
                .syncScrollFactor()
                .syncMask();
            return this;
        }
    };

    var Transform = {
        worldToLocal(point) {
            // Transform
            point.x -= this.x;
            point.y -= this.y;

            // Rotate
            var c = Math.cos(-this.rotation);
            var s = Math.sin(-this.rotation);
            var tx = point.x;
            var ty = point.y;
            point.x = tx * c - ty * s;
            point.y = tx * s + ty * c;

            // Scale
            point.x /= this.scaleX;
            point.y /= this.scaleY;
            return point;
        },

        localToWorld(point) {
            // Scale
            point.x *= this.scaleX;
            point.y *= this.scaleY;

            // Rotate
            var c = Math.cos(this.rotation);
            var s = Math.sin(this.rotation);
            var tx = point.x;
            var ty = point.y;
            point.x = tx * c - ty * s;
            point.y = tx * s + ty * c;

            // Transform
            point.x += this.x;
            point.y += this.y;
            return point;
        }
    };

    var GetScale = function (a, b) {
        if (a === b) {
            return 1;
        } else {
            return a / b;
        }
    };

    var Position = {
        updateChildPosition(child) {
            if (child.isRexContainerLite) {
                child.syncChildrenEnable = false;
            }
            var localState = GetLocalState(child);
            var parent = localState.parent;

            if (localState.syncPosition) {
                child.x = localState.x;
                child.y = localState.y;
                parent.localToWorld(child);
            }

            if (localState.syncRotation) {
                child.rotation = localState.rotation + parent.rotation;
            }

            if (localState.syncScale) {
                child.scaleX = localState.scaleX * parent.scaleX;
                child.scaleY = localState.scaleY * parent.scaleY;
            }

            if (child.isRexContainerLite) {
                child.syncChildrenEnable = true;
                child.syncPosition();
            }
            return this;
        },

        syncPosition() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildPosition, this);
            }
            return this;
        },

        resetChildPositionState(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            localState.x = child.x;
            localState.y = child.y;
            parent.worldToLocal(localState);

            localState.scaleX = GetScale(child.scaleX, parent.scaleX);
            localState.scaleY = GetScale(child.scaleY, parent.scaleY);

            localState.rotation = child.rotation - parent.rotation;
            return this;
        },

        setChildPosition(child, x, y) {
            child.x = x;
            child.y = y;
            this.resetChildPositionState(child);
            return this;
        },

        setChildLocalPosition(child, x, y) {
            var localState = GetLocalState(child);
            localState.x = x;
            localState.y = y;
            this.updateChildPosition(child);
            return this;
        },

        resetLocalPositionState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildPositionState(this);
            }
            return this;
        },

        getChildLocalX(child) {
            var localState = GetLocalState(child);
            return localState.x;
        },

        getChildLocalY(child) {
            var localState = GetLocalState(child);
            return localState.y;
        },

    };

    const DegToRad$1 = phaser.Math.DegToRad;

    var Rotation = {
        updateChildRotation(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            if (localState.syncRotation) {
                child.rotation = parent.rotation + localState.rotation;
            }
            return this;
        },

        syncRotation() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildRotation, this);
            }
            return this;
        },

        resetChildRotationState(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            localState.rotation = child.rotation - parent.rotation;
            return this;
        },

        setChildRotation(child, rotation) {
            child.rotation = rotation;
            this.resetChildRotationState(child);
            return this;
        },

        setChildAngle(child, angle) {
            child.angle = angle;
            this.resetChildRotationState(child);
            return this;
        },

        setChildLocalRotation(child, rotation) {
            var localState = GetLocalState(child);
            localState.rotation = rotation;
            this.updateChildRotation(child);
            return this;
        },

        setChildLocalAngle(child, angle) {
            var localState = GetLocalState(child);
            localState.rotation = DegToRad$1(angle);
            this.updateChildRotation(child);
            return this;
        },

        resetLocalRotationState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildRotationState(this);
            }
            return this;
        },

        getChildLocalRotation(child) {
            var localState = GetLocalState(child);
            return localState.rotation;
        },

    };

    var Scale = {
        updateChildScale(child) {
            var state = GetLocalState(child);
            var parent = state.parent;
            if (state.syncScale) {
                child.scaleX = parent.scaleX * state.scaleX;
                child.scaleY = parent.scaleY * state.scaleY;
            }
            return this;
        },

        syncScale() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildScale, this);
            }
            return this;
        },

        resetChildScaleState(child) {
            var state = GetLocalState(child);
            var parent = state.parent;
            state.scaleX = GetScale(child.scaleX, parent.scaleX);
            state.scaleY = GetScale(child.scaleY, parent.scaleY);
            return this;
        },

        setChildScale(child, scaleX, scaleY) {
            if (scaleY === undefined) {
                scaleY = scaleX;
            }
            child.scaleX = scaleX;
            child.scaleY = scaleY;
            this.resetChildScaleState(child);
            return this;
        },

        setChildScaleX(child, scaleX) {
            child.scaleX = scaleX;
            this.resetChildScaleState(child);
            return this;
        },

        setChildScaleY(child, scaleY) {
            child.scaleY = scaleY;
            this.resetChildScaleState(child);
            return this;
        },

        setChildLocalScale(child, scaleX, scaleY) {
            if (scaleY === undefined) {
                scaleY = scaleX;
            }
            var state = GetLocalState(child);
            state.scaleX = scaleX;
            state.scaleY = scaleY;
            this.updateChildScale(child);
            return this;
        },

        setChildLocalScaleX(child, scaleX) {
            var state = GetLocalState(child);
            state.scaleX = scaleX;
            this.updateChildScale(child);
            return this;
        },

        setChildLocalScaleY(child, scaleY) {
            var state = GetLocalState(child);
            state.scaleY = scaleY;
            this.updateChildScale(child);
            return this;
        },

        setChildDisplaySize(child, width, height) {
            child.setDisplaySize(width, height);
            this.resetChildScaleState(child);
            return this;
        },

        resetLocalScaleState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildScaleState(this);
            }
            return this;
        },

        getChildLocalScaleX(child) {
            var localState = GetLocalState(child);
            return localState.scaleX;
        },

        getChildLocalScaleY(child) {
            var localState = GetLocalState(child);
            return localState.scaleY;
        },
    };

    /*

    Visible in localState:

      - visible: original visible of child
      - maskVisible: invisible by parent mask, see MaskChildren.js
          - undefined (not in masking) : Equal to mask visible
          - true (mask visible) : Inside, or across parent's visible area
          - false (maske invisible) : Out of parent's visible area

    Visible result of child = (parent visible) && (child visible) && (mask visible)
    */


    var Visible = {
        updateChildVisible(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            var maskVisible = (localState.hasOwnProperty('maskVisible')) ? localState.maskVisible : true;
            var parentVisible = (parent) ? parent.visible : true;
            child.visible = parentVisible && localState.visible && maskVisible;
            return this;
        },

        syncVisible() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildVisible, this);
            }
            return this;
        },

        resetChildVisibleState(child) {
            var localState = GetLocalState(child);
            // Delete maskVisible property
            if (localState.hasOwnProperty('maskVisible')) {
                delete localState.maskVisible;
            }
            localState.visible = child.visible;
            return this;
        },

        setChildVisible(child, visible) {
            // Visible of child will be affect by parent's visible, and mask visible
            this.setChildLocalVisible(child, visible);
            return this;
        },

        // Internal method
        setChildLocalVisible(child, visible) {
            if (visible === undefined) {
                visible = true;
            }
            var localState = GetLocalState(child);
            localState.visible = visible;
            this.updateChildVisible(child);
            return this;
        },

        // Internal method
        setChildMaskVisible(child, visible) {
            if (visible === undefined) {
                visible = true;
            }
            var localState = GetLocalState(child);
            localState.maskVisible = visible;
            this.updateChildVisible(child);
            return this;
        },

        resetLocalVisibleState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildVisibleState(this);
            }
            return this;
        },

        getChildLocalVisible(child) {
            var localState = GetLocalState(child);
            return localState.visible;
        },
    };

    var Alpha = {
        updateChildAlpha(child) {
            var state = GetLocalState(child);
            var parent = state.parent;
            if (state.syncAlpha) {
                child.alpha = parent.alpha * state.alpha;
            }
            return this;
        },

        syncAlpha() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildAlpha, this);
            }
            return this;
        },

        resetChildAlphaState(child) {
            var state = GetLocalState(child);
            var parent = state.parent;
            state.alpha = GetScale(child.alpha, parent.alpha);
            return this;
        },

        setChildAlpha(child, alpha) {
            child.alpha = alpha;
            this.resetChildAlphaState(child);
            return this;
        },

        setChildLocalAlpha(child, alpha) {
            var state = GetLocalState(child);
            state.alpha = alpha;
            this.updateChildAlpha(child);
            return this;
        },

        resetLocalAlphaState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildAlphaState(this);
            }
            return this;
        },

        getChildLocalAlpha(child) {
            var localState = GetLocalState(child);
            return localState.alpha;
        },
    };

    var Active = {
        updateChildActive(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            child.active = parent.active && localState.active;
            return this;
        },

        syncActive() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildActive, this);
            }
            return this;
        },

        resetChildActiveState(child) {
            var localState = GetLocalState(child);
            localState.active = child.active;
            return this;
        },

        setChildActive(child, active) {
            child.active = active;
            this.resetChildActiveState(child);
            return this;
        },

        setChildLocalActive(child, active) {
            if (active === undefined) {
                active = true;
            }
            var localState = GetLocalState(child);
            localState.active = active;
            this.updateChildActive(child);
            return this;
        },

        resetLocalActiveState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildActiveState(this);
            }
            return this;
        },

        getChildLocalActive(child) {
            var localState = GetLocalState(child);
            return localState.active;
        },
    };

    var ScrollFactor = {
        updateChildScrollFactor(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;

            if (localState.syncScrollFactor) {
                child.scrollFactorX = parent.scrollFactorX;
                child.scrollFactorY = parent.scrollFactorY;
            }

            return this;
        },

        syncScrollFactor() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildScrollFactor, this);
            }
            return this;
        },

    };

    var CameraFilter = {
        updateCameraFilter(child) {
            var state = GetLocalState(child);
            var parent = state.parent;

            if (state.syncCameraFilter) {
                child.cameraFilter = parent.cameraFilter;
            }

            return this;
        },

        syncCameraFilter() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateCameraFilter, this);
            }
            return this;
        },
    };

    // canvas mask only
    var Mask = {
        updateChildMask(child) {
            // Don't propagate null mask to clear children's mask
            if (this.mask == null) {
                return this;
            }

            var maskGameObject = (this.mask.hasOwnProperty('geometryMask')) ? this.mask.geometryMask : this.mask.bitmapMask;
            if (maskGameObject !== child) {
                child.mask = this.mask;
            }
            return this;
        },

        syncMask() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildMask, this);
            }
            return this;
        },

        setMask(mask) {
            this.mask = mask;
            return this;
        },

        // Internal use
        clearChildrenMask() {
            var children = this.children;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                // Clear child's mask
                if (child.clearMask) {
                    child.clearMask(false);
                }

                if (!child.hasOwnProperty('isRexContainerLite')) {
                    this.setChildMaskVisible(child);
                    // Set child's maskVisible to `true`
                }
            }
            return this;
        },

        clearMask(destroyMask) {
            if (destroyMask === undefined) {
                destroyMask = false;
            }

            // Clear current mask
            if (destroyMask && this.mask) {
                mask.destroy();
            }
            this._mask = null;

            this.setChildMaskVisible(this);
            // Also set maskVisible to `true`

            this.clearChildrenMask();

            return this;
        },
    };

    var FilterDisplayGameObjects = function (gameObjects, referanceGameObject) {
        var targetDisplayList = (referanceGameObject) ? referanceGameObject.displayList : undefined;
        var targetParentContainer = (referanceGameObject) ? referanceGameObject.parentContainer : undefined;

        return gameObjects.filter(function (gameObject) {
            var displayList = gameObject.displayList;
            var parentContainer = gameObject.parentContainer;

            // Inside a scene or a layer, or
            // Inside a container
            if (!displayList && !parentContainer) {
                return false;
            }

            if (!referanceGameObject) {
                return true;
            }

            // At the same scene or layer, or
            if (displayList) {
                return (displayList === targetDisplayList);
            }
            // Inside the same container
            if (parentContainer) {
                return (parentContainer === targetParentContainer);
            }

            return false;
        })
    };

    var Depth = {
        setDepth(value, containerOnly) {
            this.depth = value;

            if (!this.layerRendererEnable) {
                if (!containerOnly && this.children) {
                    var children = this.getAllChildren();
                    for (var i = 0, cnt = children.length; i < cnt; i++) {
                        children[i].depth = value;
                    }
                }
            }
            // else: children are inside rendererLayer, not in scene's display list
            return this;
        },

        swapDepth(containerB) {
            var depthA = this.depth;
            var depthB = containerB.depth;
            this.setDepth(depthB);
            containerB.setDepth(depthA);
            return this;
        },

        incDepth(inc) {
            this.depth += inc;

            if (!this.layerRendererEnable) {
                if (this.children) {
                    var children = this.getAllChildren();
                    for (var i = 0, cnt = children.length; i < cnt; i++) {
                        children[i].depth += inc;
                    }
                }
            }
            // else: children are inside rendererLayer, not in scene's display list
            return this;
        },

        bringToTop() {
            var displayList = this.displayList;
            if (!displayList) {
                return this;
            }

            if (!this.layerRendererEnable) {
                var children = this.getAllChildren([this]);
                SortGameObjectsByDepth(children, false);
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    var child = children[i];
                    if (displayList.exists(child)) {
                        displayList.bringToTop(child);
                    }
                }
            } else {
                if (displayList.exists(this)) {
                    displayList.bringToTop(this);
                }
                // children are inside rendererLayer, not in scene's display list
            }

            return this;
        },

        bringMeToTop() {
            return this.bringToTop();
        },

        sendToBack() {
            var displayList = this.displayList;
            if (!displayList) {
                return this;
            }

            if (!this.layerRendererEnable) {
                var children = this.getAllChildren([this]);
                SortGameObjectsByDepth(children, true);
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    var child = children[i];
                    if (displayList.exists(child)) {
                        displayList.sendToBack(child);
                    }
                }
            } else {
                if (displayList.exists(this)) {
                    displayList.sendToBack(this);
                }
                // children are inside rendererLayer, not in scene's display list
            }
            return this;
        },

        sendMeToBack() {
            return this.sendToBack();
        },

        moveDepthBelow(gameObject) {
            var displayList = this.displayList;
            if (!displayList) {
                return this;
            }

            if (gameObject.displayList !== displayList) {
                // Do nothing if not at the same display list
                return this;
            }

            if (!this.layerRendererEnable) {
                var children = this.getAllChildren([this]);
                SortGameObjectsByDepth(children, false);
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    var child = children[i];
                    if (displayList.exists(child)) {
                        displayList.moveBelow(gameObject, child);
                        break;
                    }
                }
            } else {
                if (displayList.exists(this)) {
                    displayList.moveBelow(gameObject, this);
                }
                // children are inside rendererLayer, not in scene's display list
            }
            return this;
        },

        moveMyDepthBelow(gameObject) {
            return this.moveDepthBelow(gameObject);
        },

        moveDepthAbove(gameObject) {
            var displayList = this.displayList;
            if (!displayList) {
                return this;
            }

            if (gameObject.displayList !== displayList) {
                // Do nothing if not at the same display list
                return this;
            }

            if (!this.layerRendererEnable) {
                var children = this.getAllChildren([this]);
                SortGameObjectsByDepth(children, true);
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    var child = children[i];
                    if (displayList.exists(child)) {
                        displayList.moveAbove(gameObject, child);
                        break;
                    }
                }
            } else {
                if (displayList.exists(this)) {
                    displayList.moveAbove(gameObject, this);
                }
                // children are inside rendererLayer, not in scene's display list
            }
            return this;
        },

        moveMyDepthAbove(gameObject) {
            return this.moveDepthAbove(gameObject);
        },

        bringChildToTop(child) {
            if ((child === this) && (this.layerRendererEnable)) {
                // containterLite is at the very bottom, can't move it to top
                return this;
            }

            var gameObjects;
            if ((child !== this) && child.isRexContainerLite && (!child.layerRendererEnable)) {
                gameObjects = child.getAllChildren([child]);
                gameObjects = FilterDisplayGameObjects(gameObjects, child);
                gameObjects = SortGameObjectsByDepth(gameObjects, false);

            } else {
                gameObjects = [child];
            }

            var topChild;
            if (!this.layerRendererEnable) {
                var children = this.getAllChildren([this]);
                children = FilterDisplayGameObjects(children, child);
                children = SortGameObjectsByDepth(children, false);
                topChild = children[children.length - 1];
            } else {
                topChild = this;
            }

            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                var gameObject = gameObjects[i];
                if (topChild === gameObject) {
                    continue;
                }
                if ((gameObject !== this) && (topChild.displayList !== gameObject.displayList)) {
                    continue;
                }

                topChild.displayList.moveAbove(gameObject, topChild);
                topChild = gameObject;
            }

            return this;
        },

        sendChildToBack(child) {
            if ((child === this) && (this.layerRendererEnable)) {
                // containterLite is at the very bottom, do nothing
                return this;
            }

            var gameObjects;
            if ((child !== this) && child.isRexContainerLite && (!child.layerRendererEnable)) {
                gameObjects = child.getAllChildren([child]);
                gameObjects = FilterDisplayGameObjects(gameObjects, child);
                gameObjects = SortGameObjectsByDepth(gameObjects, false);
            } else {
                gameObjects = [child];
            }

            var bottomChild;
            if (!this.layerRendererEnable) {
                var children = this.getAllChildren([this]);
                children = FilterDisplayGameObjects(children, child);
                children = SortGameObjectsByDepth(children, false);
                bottomChild = children[0];
            } else {
                bottomChild = this;
            }

            for (var i = gameObjects.length - 1; i >= 0; i--) {
                var gameObject = gameObjects[i];
                if (bottomChild === gameObject) {
                    continue;
                }
                if ((gameObject !== this) && (bottomChild.displayList !== gameObject.displayList)) {
                    continue;
                }

                bottomChild.displayList.moveBelow(gameObject, bottomChild);
                bottomChild = gameObject;
            }

            return this;
        },
    };

    var DepthFirstSearch = function (root, callback) {
        var skip = callback(root);
        if ((!skip) && root.isRexContainerLite) {
            var children = root.children;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                DepthFirstSearch(children[i], callback);
            }
        }
    };

    var BreadthFirstSearch = function (root, callback) {
        var queue = [root];
        while (queue.length > 0) {
            var current = queue.shift();
            var skip = callback(current);

            if ((!skip) && current.isRexContainerLite) {
                queue.push(...current.children);
            }
        }
    };

    const ArrayUtils = phaser.Utils.Array;

    var Children = {
        getChildren(out) {
            if (!out) {
                out = this.children; // Return internal children array
            } else {
                for (var i = 0, cnt = this.children.length; i < cnt; i++) {
                    out.push(this.children[i]);
                }
                // Copy children
            }
            return out;
        },

        getAllChildren(out) {
            if (out === undefined) {
                out = [];
            }

            var root = this;
            BreadthFirstSearch(root, function (child) {
                // Don't add root
                if (child === root) {
                    return;
                }
                out.push(child);
            });

            return out;
        },

        getAllVisibleChildren(out) {
            if (out === undefined) {
                out = [];
            }

            var root = this;
            BreadthFirstSearch(root, function (child) {
                // Don't add root
                if (child === root) {
                    return;
                }
                // Don't add invisible child
                if (!child.visible) {
                    return true;
                }
                out.push(child);
            });

            return out;
        },

        bfs(callback, root) {
            if (root === undefined) {
                root = this;
            }
            BreadthFirstSearch(root, callback);
            return this;
        },

        dfs(callback, root) {
            if (root === undefined) {
                root = this;
            }
            DepthFirstSearch(root, callback);
            return this;
        },

        contains(gameObject) { // Override Base.contains method
            var parent = GetParent(gameObject);
            if (!parent) {
                return false;
            } else if (parent === this) {
                return true;
            } else {
                return this.contains(parent);
            }
        },

        getByName(name, recursive) {
            if (!recursive) {
                return ArrayUtils.GetFirst(this.children, 'name', name); // object, or null if not found

            } else { // recursive
                // Breadth-first search
                var queue = [this];
                var parent, child;
                while (queue.length) {
                    parent = queue.shift();

                    for (var i = 0, cnt = parent.children.length; i < cnt; i++) {
                        child = parent.children[i];
                        if (child.name === name) {
                            return child;
                        } else if (child.isRexContainerLite) {
                            queue.push(child);
                        }
                    }
                }
                return null;

            }

        },

        getRandom(startIndex, length) {
            return ArrayUtils.GetRandom(this.children, startIndex, length);
        },

        getFirst(property, value, startIndex, endIndex) {
            return ArrayUtils.GetFirstElement(this.children, property, value, startIndex, endIndex);
        },

        getAll(property, value, startIndex, endIndex) {
            return ArrayUtils.GetAll(this.children, property, value, startIndex, endIndex);
        },

        count(property, value, startIndex, endIndex) {
            return ArrayUtils.CountAllMatching(this.children, property, value, startIndex, endIndex);
        },

        swap(child1, child2) {
            ArrayUtils.Swap(this.children, child1, child2);
            return this;
        },

        setAll(property, value, startIndex, endIndex) {
            ArrayUtils.SetAll(this.children, property, value, startIndex, endIndex);
            return this;
        },
    };

    var GetLocalStates = function (gameObjects) {
        var localStates = [];
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var gameObject = gameObjects[i];
            if (!gameObject.hasOwnProperty('rexContainer')) {
                continue;
            }
            localStates.push(gameObject.rexContainer);
        }
        return localStates;
    };

    var GetScene = function (gameObjects) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var scene = gameObjects[i].scene;
            if (scene) {
                return scene;
            }
        }
        return null;
    };

    var UpdateChild = function (tween, key, target) {
        if (!target.parent) {
            // target object was removed, so remove this tween too
            tween.remove();
            return;
        }

        var parent = target.parent;
        var child = target.self;
        switch (key) {
            case 'x':
            case 'y':
                parent.updateChildPosition(child);
                break;

            case 'angle':
            case 'rotation':
                parent.updateChildRotation(child);
                break;

            case 'scaleX':
            case 'scaleY':        
            case 'displayWidth':
            case 'displayHeight':
                parent.updateChildScale(child);
                break;

            case 'alpha':
                parent.updateChildAlpha(child);
                break;

            default:
                parent.updateChildPosition(child);
                parent.updateChildRotation(child);
                parent.updateChildScale(child);
                parent.updateChildAlpha(child);
                break;
        }
    };

    var Tween = {
        tweenChild(tweenConfig) {
            var targets = tweenConfig.targets;
            if (!Array.isArray(targets)) {
                targets = [targets];
            }

            var scene = this.scene || GetScene(targets);
            if (!scene) {
                return;
            }

            // Map child game objects to local states
            tweenConfig.targets = GetLocalStates(targets);
            var tween = scene.tweens.add(tweenConfig);

            // Update child game object in 'update' event
            tween.on('update', UpdateChild);

            return tween;
        },

        tweenSelf(tweenConfig) {
            tweenConfig.targets = [this];
            return this.tweenChild(tweenConfig);
        },

        createTweenChildConfig(tweenConfig) {
            var targets = tweenConfig.targets;
            if (targets) {
                if (!Array.isArray(targets)) {
                    targets = [targets];
                }
                // Map child game objects to local states
                tweenConfig.targets = GetLocalStates(targets);
            }

            var onUpdate = tweenConfig.onUpdate;
            tweenConfig.onUpdate = function (tween, target) {
                if (onUpdate) {
                    onUpdate(tween, target);
                }
                UpdateChild(tween, undefined, target);
            };

            return tweenConfig;
        },

        tween(tweenConfig) {
            var scene = this.scene;
            if (!tweenConfig.targets) {
                tweenConfig.targets = this;
            }
            return scene.tweens.add(tweenConfig);
        },
    };

    var ClearLayerState = function (gameObjects, layer) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var gameObject = gameObjects[i];
            if (!gameObject.hasOwnProperty('rexContainer')) {
                continue;
            }

            var state = GetLocalState(gameObject);
            if (state.layer === layer) {
                state.layer = null;
            }
        }
    };

    var RemoveFromContainer = function (p3Container, descending, addToScene) {
        if (!this.scene) {
            // Destroyed
            return;
        }

        var gameObjects = GetValidChildren(this);

        SortGameObjectsByDepth(gameObjects, descending);

        p3Container.remove(gameObjects);

        ClearLayerState(gameObjects, p3Container);

        if (addToScene) {
            gameObjects.forEach(function (gameObject) {
                gameObject.addToDisplayList();
            });
        }
    };

    const LayerClass = phaser.GameObjects.Layer;

    var IsLayerGameObject = function (gameObject) {
        return (gameObject instanceof LayerClass);
    };

    var IsLayer = function (gameObject) {
        return gameObject && (IsLayerGameObject(gameObject) || gameObject.isRexContainerLiteLayer);
    };

    var P3Container = {
        addToContainer(p3Container) {
            this._setParentContainerFlag = true;
            AddToContainer.call(this, p3Container, {
                includeParent: true,
                setLayerState: false,
                clearDepthSort: false,
            });
            this._setParentContainerFlag = false;
            return this;
        },

        addToLayer(layer) {
            AddToContainer.call(this, layer, {
                includeParent: true,
                setLayerState: false,
                clearDepthSort: false,
            });
            return this;
        },

        removeFromContainer() {
            if (!this.parentContainer) {
                return this;
            }

            this._setParentContainerFlag = true;
            RemoveFromContainer.call(this, this.parentContainer, true, false);
            this._setParentContainerFlag = false;
            return this;
        },

        removeFromLayer(addToScene) {
            if (addToScene === undefined) {
                addToScene = true;
            }

            if (!IsLayer(this.displayList)) {
                return this;
            }

            RemoveFromContainer.call(this, this.displayList, false, addToScene);

            return this;
        },

        getParentContainer() {
            if (this.parentContainer) {
                return this.parentContainer;
            }

            // One of parent container has a layer
            var parent = this.getParent();
            while (parent) {
                var p3Container = parent.parentContainer;
                if (p3Container) {
                    return p3Container;
                }
                parent = parent.getParent();
            }

            return null;
        },

        addToParentContainer(gameObject) {
            // Do nothing if gameObject is not in any displayList
            if (!gameObject.displayList) {
                return this;
            }

            var p3Container = this.getParentContainer();
            if (!p3Container) {
                return this;
            }

            if (gameObject.isRexContainerLite) {
                // Add containerLite and its children
                gameObject.addToContainer(p3Container);
            } else {
                // Add gameObject directly
                p3Container.add(gameObject);
            }

            return this;
        },

        addToPatentLayer(gameObject) {
            // Do nothing if gameObject is not in any displayList
            if (!gameObject.displayList) {
                return this;
            }

            // At the same display list
            var parentLayer = this.displayList;
            if (parentLayer === gameObject.displayList) {
                return this;
            }

            if (IsLayer(parentLayer)) {
                if (gameObject.isRexContainerLite) {
                    // Add containerLite and its children
                    gameObject.addToLayer(parentLayer);
                } else {
                    // Add gameObject directly
                    parentLayer.add(gameObject);
                }
            }

            return this;
        }
    };

    var GetRendererLayer = function () {
        // This containerLite has rendererLayer
        if (this.rendererLayer) {
            return this.rendererLayer;
        }

        // One of parent is layerRendererEnable
        var parent = this.getParent();
        while (parent) {
            if (parent.rendererLayer) {
                return parent.rendererLayer;
            }

            parent = parent.getParent();
        }

        return null;
    };

    var RendererLayer = {
        hasLayer() {
            return this.layerRendererEnable;
        },

        enableLayer() {
            this.enableLayerRenderer();
            return this;
        },

        // Backward compatible
        getLayer() {
            this.enableLayerRenderer();
            return this;
        },

        // Override Base.addChildCallback
        addChildCallback(gameObject) {
            /* Base.addChildCallback:
            var layer = this.rendererLayer;
            if (layer) {
                layer.add(gameObject); // will invoke rendererLayer.queueDepthSort()
            }
            */

            // Don't add to layer if gameObject is not in any displayList
            if (!gameObject.displayList) {
                return;
            }

            // Move gameObject from scene to layer (rendererLayer)
            var layer = GetRendererLayer.call(this);
            if (!layer) {
                return;
            }

            if (layer === gameObject.displayList) {
                return;
            }

            if (gameObject.isRexContainerLite) {
                // Add containerLite and its children
                AddToContainer.call(gameObject, layer, {
                    includeParent: true,
                    setLayerState: true,
                    clearDepthSort: false,
                });
            } else {
                // Add gameObject directly
                layer.add(gameObject);
            }

            var state = GetLocalState(gameObject);
            state.layer = layer;
        },

        // Override Base.removeChildCallback
        removeChildCallback(gameObject, destroyChild) {
            /* Base.removeChildCallback:
            var layer = this.rendererLayer;
            if (layer) {
                layer.remove(gameObject); // will invoke rendererLayer.queueDepthSort()
            }
            */

            // Move gameObject from layer to scene
            var state = GetLocalState(gameObject);
            var layer = state.layer;
            if (!layer) {
                return;
            }

            if (gameObject.isRexContainerLite) {
                // Remove containerLite and its children
                gameObject.removeFromLayer(true);
            } else {
                // Remove gameObject directly
                layer.remove(gameObject);
            }

            state.layer = null;
        },
    };

    var RenderTexture = {
        snapshot(config) {
            // Save scale
            var scaleXSave = this.scaleX;
            var scaleYSave = this.scaleY;
            var scale1 = (scaleXSave === 1) && (scaleYSave === 1);
            if (!scale1) {
                this.setScale(1);
            }

            // Snapshot with scale = 1
            if (config === undefined) {
                config = {};
            }
            config.gameObjects = this.getAllVisibleChildren();
            config.x = this.x;
            config.y = this.y;
            config.originX = this.originX;
            config.originY = this.originY;
            var rt = Snapshot(config);
            var isValidRT = !!rt.scene;

            // Restore scale
            if (!scale1) {
                this.setScale(scaleXSave, scaleYSave);

                if (isValidRT) {
                    rt.setScale(scaleXSave, scaleYSave);
                }
            }

            return (isValidRT) ? rt : this;
        }
    };

    const GetValue$9 = phaser.Utils.Objects.GetValue;

    var DrawBounds$1 = function (gameObjects, graphics, config) {
        var strokeColor, lineWidth, fillColor, fillAlpha, padding, includeParent;
        if (typeof (config) === 'number') {
            strokeColor = config;
        } else {
            strokeColor = GetValue$9(config, 'color');
            lineWidth = GetValue$9(config, 'lineWidth');
            fillColor = GetValue$9(config, 'fillColor');
            fillAlpha = GetValue$9(config, 'fillAlpha');
            padding = GetValue$9(config, 'padding');
            includeParent = GetValue$9(config, 'includeParent');
        }

        if (strokeColor === undefined) { strokeColor = 0xffffff; }
        if (lineWidth === undefined) { lineWidth = 1; }
        if (fillColor === undefined) { fillColor = null; }    if (fillAlpha === undefined) { fillAlpha = 1; }    if (padding === undefined) { padding = 0; }
        if (includeParent === undefined) { includeParent = true; }

        if (Array.isArray(gameObjects)) {
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                Draw(gameObjects[i], graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding, includeParent);
            }
        } else {
            Draw(gameObjects, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding, includeParent);
        }
    };

    var Draw = function (gameObject, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding, includeParent) {
        var canDrawBound = gameObject.getBounds ||
            ((gameObject.width !== undefined) && (gameObject.height !== undefined));
        if (!canDrawBound) {
            return;
        }

        var p0 = GetTopLeft(gameObject, Points[0], includeParent);
        p0.x -= padding;
        p0.y -= padding;

        var p1 = GetTopRight(gameObject, Points[1], includeParent);
        p1.x += padding;
        p1.y -= padding;

        var p2 = GetBottomRight(gameObject, Points[2], includeParent);
        p2.x += padding;
        p2.y += padding;

        var p3 = GetBottomLeft(gameObject, Points[3], includeParent);
        p3.x -= padding;
        p3.y += padding;

        if (fillColor !== null) {
            graphics
                .fillStyle(fillColor, fillAlpha)
                .fillPoints(Points, true, true);
        }
        if (strokeColor !== null) {
            graphics
                .lineStyle(lineWidth, strokeColor)
                .strokePoints(Points, true, true);
        }

    };

    var Points = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];

    const GetValue$8 = phaser.Utils.Objects.GetValue;

    var DrawBounds = function (graphics, config) {
        var drawContainer = GetValue$8(config, 'drawContainer', true);

        var gameObjects = GetValue$8(config, 'children');
        if (gameObjects === undefined) {
            gameObjects = this.getAllVisibleChildren([this]);
        }

        if (!drawContainer) {
            gameObjects = gameObjects.filter(function (gameObject) {
                return !gameObject.isRexContainerLite;
            });
        }

        DrawBounds$1(gameObjects, graphics, config);

        return this;
    };

    const RotateAround = phaser.Math.RotateAround;

    var ChangeOrigin$1 = function (gameObject, originX, originY) {
        if (originY === undefined) {
            originY = originX;
        }

        var deltaXY = {
            x: (originX - gameObject.originX) * gameObject.displayWidth,
            y: (originY - gameObject.originY) * gameObject.displayHeight
        };
        RotateAround(deltaXY, 0, 0, gameObject.rotation);

        gameObject.originX = originX;
        gameObject.originY = originY;
        gameObject.x = gameObject.x + deltaXY.x;
        gameObject.y = gameObject.y + deltaXY.y;

        return gameObject;
    };

    var ChangeOrigin = function (originX, originY) {
        this.syncChildrenEnable = false;
        ChangeOrigin$1(this, originX, originY);
        this.syncChildrenEnable = true;

        var children = this.getAllChildren();
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            this.resetChildPositionState(children[i]);
        }
        return this;
    };

    var methods = {
        changeOrigin: ChangeOrigin,
        drawBounds: DrawBounds,
    };

    Object.assign(
        methods,
        Parent,
        AddChild,
        RemoveChild,
        ChildState,
        Transform,
        Position,
        Rotation,
        Scale,
        Visible,
        Alpha,
        Active,
        ScrollFactor,
        CameraFilter,
        Mask,
        Depth,
        Children,
        Tween,
        P3Container,
        RendererLayer,
        RenderTexture,
    );

    class ContainerLite extends Base {
        constructor(scene, x, y, width, height, children) {
            if (Array.isArray(width)) {
                children = width;
                width = undefined;
                height = undefined;
            }
            super(scene, x, y, width, height);
            this.type = 'rexContainerLite';
            this.isRexContainerLite = true;
            this.syncChildrenEnable = true;

            this._active = true;
            this._mask = null;
            this._scrollFactorX = 1;
            this._scrollFactorY = 1;
            this._cameraFilter = 0;

            if (children) {
                this.add(children);
            }
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            this.syncChildrenEnable = false; // Don't sync properties changing anymore
            super.destroy(fromScene);
        }

        resize(width, height) {
            this.setSize(width, height);
            return this;
        }

        get x() {
            return this._x;
        }

        set x(value) {
            if (this._x === value) {
                return;
            }
            this._x = value;

            this.syncPosition();
        }

        get y() {
            return this._y;
        }

        set y(value) {
            if (this._y === value) {
                return;
            }
            this._y = value;

            this.syncPosition();
        }

        // Override
        get rotation() {
            return super.rotation;
        }

        set rotation(value) {
            if (this.rotation === value) {
                return;
            }
            super.rotation = value;

            this.syncPosition();
        }

        // Override
        get scaleX() {
            return super.scaleX;
        }

        set scaleX(value) {
            if (this.scaleX === value) {
                return;
            }
            super.scaleX = value;

            this.syncPosition();
        }

        // Override
        get scaleY() {
            return super.scaleY;
        }

        set scaleY(value) {
            if (this.scaleY === value) {
                return;
            }
            super.scaleY = value;

            this.syncPosition();
        }

        // Override
        get scale() {
            return super.scale;
        }

        set scale(value) {
            if (this.scale === value) {
                return;
            }
            super.scale = value;

            this.syncPosition();
        }

        // Override
        get visible() {
            return super.visible;
        }

        set visible(value) {
            if (super.visible === value) {
                return;
            }
            super.visible = value;

            this.syncVisible();
        }

        // Override
        get alpha() {
            return super.alpha;
        }

        set alpha(value) {
            if (super.alpha === value) {
                return;
            }
            super.alpha = value;

            this.syncAlpha();
        }

        // Override
        get active() {
            return this._active;
        }

        set active(value) {
            if (this._active === value) {
                return;
            }
            this._active = value;

            this.syncActive();
        }

        // Override
        get mask() {
            return this._mask;
        }
        set mask(mask) {
            if (this._mask === mask) {
                return;
            }
            this._mask = mask;

            if (!this.layerRendererEnable) {
                this.syncMask();
            }
        }

        // Override
        get scrollFactorX() {
            return this._scrollFactorX;
        }

        set scrollFactorX(value) {
            if (this._scrollFactorX === value) {
                return;
            }

            this._scrollFactorX = value;
            this.syncScrollFactor();
        }
        get scrollFactorY() {
            return this._scrollFactorY;
        }

        set scrollFactorY(value) {
            if (this._scrollFactorY === value) {
                return;
            }

            this._scrollFactorY = value;
            this.syncScrollFactor();
        }

        get cameraFilter() {
            return this._cameraFilter;
        }

        set cameraFilter(value) {
            if (this._cameraFilter === value) {
                return;
            }

            this._cameraFilter = value;
            this.syncCameraFilter();
        }

        // Compatiable with container plugin
        get list() {
            return this.children;
        }

        static GetParent(child) {
            return GetParent(child);
        }

        // For p3-container
        get parentContainer() {
            return this._parentContainer;
        }

        set parentContainer(value) {
            // Initialize
            if (!this._parentContainer && !value) {
                this._parentContainer = value;
                return;
            }

            // Set this._parentContainer only,
            // if under AddToContainer, or RemoveFromContainer methods
            if (this.setParentContainerFlag) {
                this._parentContainer = value;
                return;
            }
            // else if (!this.setParentContainerFlag)

            // Add itself and all children to container,
            // Or remove itseld and all children from container
            if (this._parentContainer && !value) {
                // Remove from container
                this.removeFromContainer();
                this._parentContainer = value;
            } else if (value) {
                // Add to container
                this._parentContainer = value;
                this.addToContainer(value);
            } else {
                this._parentContainer = value;
            }
        }

        get setParentContainerFlag() {
            if (this._setParentContainerFlag) {
                return true;
            }
            var parent = GetParent(this);
            return (parent) ? parent.setParentContainerFlag : false;
        }

    }

    Object.assign(
        ContainerLite.prototype,
        methods
    );

    var ForEachFace = function (faces, callback, scope, ignoreInvalid) {
        if (Array.isArray(faces)) {
            var isBreak = false;
            for (var i = 0, cnt = faces.length; i < cnt; i++) {
                var face = faces[i];
                if (ignoreInvalid && !face) {
                    continue;
                }
                if (scope) {
                    isBreak = callback.call(scope, face, i, faces);
                } else {
                    isBreak = callback(face, i, faces);
                }

                if (isBreak) {
                    return;
                }
            }
        } else {
            var isBreak = false;
            for (var name in faces) {
                var face = faces[name];
                if (ignoreInvalid && !face) {
                    continue;
                }
                if (scope) {
                    isBreak = callback.call(scope, face, name, faces);
                } else {
                    isBreak = callback(face, name, faces);
                }

                if (isBreak) {
                    return;
                }
            }
        }
    };

    const RadToDeg = phaser.Math.RadToDeg;
    const DegToRad = phaser.Math.DegToRad;

    class FaceContainer extends ContainerLite {
        constructor(scene, x, y, width, height, faces) {
            super(scene, x, y, width, height);
            this.faces = faces;  // Face Dictionary, or array

            ForEachFace(faces, function (face) {
                face.setPosition(x, y);
                this.add(face);
            }, this, true);
        }

        // Override
        get rotationX() {
            return 0;
        }

        // Override
        set rotationX(value) {
            // rad
        }

        get angleX() {
            return RadToDeg(this.rotationX);
        }

        set angleX(value) {
            this.rotationX = DegToRad(value);
        }

        get rotateX() {
            return RadToDeg(this.rotationX);
        }

        set rotateX(value) {
            this.rotationX = DegToRad(value);
        }

        // Override
        get rotationY() {
            return 0;
        }

        // Override
        set rotationY(value) {
            // rad
        }

        get angleY() {
            return RadToDeg(this.rotationY);
        }

        set angleY(value) {
            this.rotationY = DegToRad(value);
        }

        get rotateY() {
            return RadToDeg(this.rotationY);
        }

        set rotateY(value) {
            this.rotationY = DegToRad(value);
        }

        // Override
        get rotationZ() {
            return 0;
        }

        // Override
        set rotationZ(value) {
            // rad
        }

        get angleZ() {
            return RadToDeg(this.rotationZ);
        }

        set angleZ(value) {
            this.rotationZ = DegToRad(value);
        }

        get rotateZ() {
            return RadToDeg(this.rotationZ);
        }

        set rotateZ(value) {
            this.rotationZ = DegToRad(value);
        }

        setDebug(graphic, callback) {
            ForEachFace(this.faces, function (face) {
                face.setDebug(graphic, callback);
            }, null, true);
            return this;
        }

        forEachFace(callback, scope, ignoreInvalid) {
            ForEachFace(this.faces, callback, scope, ignoreInvalid);
            return this;
        }

    }

    Object.assign(
        FaceContainer.prototype,
        RotateMethods
    );

    const IsPlainObject$1 = phaser.Utils.Objects.IsPlainObject;
    const DefaultImageConfig = { key: '__WHITE' };
    const ClassMap = {
        image: Image,
        rendertexture: RenderTexture$1
    };

    var CreatePerspectiveObject = function (scene, config) {
        if (config === undefined) {
            config = DefaultImageConfig;
        }

        var perspectiveObject;
        if (IsPlainObject$1(config)) {
            if (!config.hasOwnProperty('type')) {
                if (config.hasOwnProperty('key')) {
                    config.type = 'image';
                } else if (config.hasOwnProperty('width')) {
                    config.type = 'rendertexture';
                }
            }

            perspectiveObject = new (ClassMap[config.type])(scene, config);
            scene.add.existing(perspectiveObject);
        } else {
            perspectiveObject = config;
        }

        return perspectiveObject;
    };

    var CreateFaces = function (scene, config, faceNames) {
        var faces;
        if (faceNames === undefined) { // Return an array of faces
            faces = [];
            var face, faceConfig;
            for (var i = 0, cnt = config.length; i < cnt; i++) {
                faceConfig = config[i];
                if (faceConfig) {
                    face = CreatePerspectiveObject(scene, faceConfig);
                } else {
                    face = null;
                }
                faces.push(face);
            }
        } else { // Return a face map
            faces = {};
            var face, name;
            for (var i = 0, cnt = faceNames.length; i < cnt; i++) {
                name = faceNames[i];
                if (config.hasOwnProperty(name)) {
                    face = CreatePerspectiveObject(scene, config[name]);
                } else {
                    face = null;
                }

                faces[name] = face;
            }
        }

        return faces;
    };

    var LayoutFaces = function (parent, faces) {
        var backFace = faces.back;
        if (backFace) {
            if (parent.orientation === 0) { // Flip around Y
                backFace.angleY = 180;
            } else { // Flip around X
                backFace.angleX = 180;
            }
        }
    };

    var EventEmitterMethods = {
        setEventEmitter(eventEmitter, EventEmitterClass) {
            if (EventEmitterClass === undefined) {
                EventEmitterClass = phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
            }
            this._privateEE = (eventEmitter === true) || (eventEmitter === undefined);
            this._eventEmitter = (this._privateEE) ? (new EventEmitterClass()) : eventEmitter;
            return this;
        },

        destroyEventEmitter() {
            if (this._eventEmitter && this._privateEE) {
                this._eventEmitter.shutdown();
            }
            return this;
        },

        getEventEmitter() {
            return this._eventEmitter;
        },

        on() {
            if (this._eventEmitter) {
                this._eventEmitter.on.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        once() {
            if (this._eventEmitter) {
                this._eventEmitter.once.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        off() {
            if (this._eventEmitter) {
                this._eventEmitter.off.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        emit(event) {
            if (this._eventEmitter && event) {
                this._eventEmitter.emit.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        addListener() {
            if (this._eventEmitter) {
                this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeListener() {
            if (this._eventEmitter) {
                this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeAllListeners() {
            if (this._eventEmitter) {
                this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        listenerCount() {
            if (this._eventEmitter) {
                return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
            }
            return 0;
        },

        listeners() {
            if (this._eventEmitter) {
                return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
            }
            return [];
        },

        eventNames() {
            if (this._eventEmitter) {
                return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
            }
            return [];
        },
    };

    const SceneClass = phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
    };

    var GetSceneObject = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsSceneObject(object)) { // object = scene
            return object;
        } else if (object.scene && IsSceneObject(object.scene)) { // object = game object
            return object.scene;
        } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) { // parent = bob object
            return object.parent.scene;
        } else {
            return null;
        }
    };

    const GameClass = phaser.Game;
    var IsGame = function (object) {
        return (object instanceof GameClass);
    };

    var GetGame = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsGame(object)) {
            return object;
        } else if (IsGame(object.game)) {
            return object.game;
        } else if (IsSceneObject(object)) { // object = scene object
            return object.sys.game;
        } else if (IsSceneObject(object.scene)) { // object = game object
            return object.scene.sys.game;
        }
    };

    const GetValue$7 = phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$7(config, 'eventEmitter', true));

            // Register callback of parent destroy event, also see `shutdown` method
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
                    this.parent.once('destroy', this.onParentDestroy, this);
                }

                // bob object does not have event emitter
            }

        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            // parent might not be shutdown yet
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
                    this.parent.off('destroy', this.onParentDestroy, this);
                }

                // bob object does not have event emitter
            }


            this.destroyEventEmitter();

            this.parent = undefined;
            this.scene = undefined;
            this.game = undefined;

            this.isShutdown = true;
        }

        destroy(fromScene) {
            this.shutdown(fromScene);
        }

        onEnvDestroy() {
            this.destroy(true);
        }

        onParentDestroy(parent, fromScene) {
            this.destroy(fromScene);
        }

        setParent(parent) {
            this.parent = parent;  // gameObject, scene, or game

            this.scene = GetSceneObject(parent);
            this.game = GetGame(parent);

            return this;
        }

    }
    Object.assign(
        ComponentBase.prototype,
        EventEmitterMethods
    );

    const GetValue$6 = phaser.Utils.Objects.GetValue;

    class TickTask extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this._isRunning = false;
            this.isPaused = false;
            this.tickingState = false;
            this.setTickingMode(GetValue$6(config, 'tickingMode', 1));
            // boot() later
        }

        // override
        boot() {
            if ((this.tickingMode === 2) && (!this.tickingState)) {
                this.startTicking();
            }
        }

        // override
        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.stop();
            if (this.tickingState) {
                this.stopTicking();
            }
            super.shutdown(fromScene);
        }

        setTickingMode(mode) {
            if (typeof (mode) === 'string') {
                mode = TICKINGMODE[mode];
            }
            this.tickingMode = mode;
        }

        // override
        startTicking() {
            this.tickingState = true;
        }

        // override
        stopTicking() {
            this.tickingState = false;
        }

        get isRunning() {
            return this._isRunning;
        }

        set isRunning(value) {
            if (this._isRunning === value) {
                return;
            }

            this._isRunning = value;
            if ((this.tickingMode === 1) && (value != this.tickingState)) {
                if (value) {
                    this.startTicking();
                } else {
                    this.stopTicking();
                }
            }
        }

        start() {
            this.isPaused = false;
            this.isRunning = true;
            return this;
        }

        pause() {
            // Only can ba paused in running state
            if (this.isRunning) {
                this.isPaused = true;
                this.isRunning = false;
            }
            return this;
        }

        resume() {
            // Only can ba resumed in paused state (paused from running state)
            if (this.isPaused) {
                this.isPaused = false;
                this.isRunning = true;
            }
            return this;
        }

        stop() {
            this.isPaused = false;
            this.isRunning = false;
            return this;
        }

        complete() {
            this.isPaused = false;
            this.isRunning = false;
            this.emit('complete', this.parent, this);
        }
    }

    const TICKINGMODE = {
        'no': 0,
        'lazy': 1,
        'always': 2
    };

    const GetValue$5 = phaser.Utils.Objects.GetValue;

    class SceneUpdateTickTask extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            // scene update : update, preupdate, postupdate, prerender, render
            // game update : step, poststep, 

            // If this.scene is not available, use game's 'step' event
            var defaultEventName = (this.scene) ? 'update' : 'step';
            this.tickEventName = GetValue$5(config, 'tickEventName', defaultEventName);
            this.isSceneTicker = !IsGameUpdateEvent(this.tickEventName);

        }

        startTicking() {
            super.startTicking();

            if (this.isSceneTicker) {
                this.scene.sys.events.on(this.tickEventName, this.update, this);
            } else {
                this.game.events.on(this.tickEventName, this.update, this);
            }

        }

        stopTicking() {
            super.stopTicking();

            if (this.isSceneTicker && this.scene) { // Scene might be destoryed
                this.scene.sys.events.off(this.tickEventName, this.update, this);
            } else if (this.game) {
                this.game.events.off(this.tickEventName, this.update, this);
            }
        }

        // update(time, delta) {
        //     
        // }

    }

    var IsGameUpdateEvent = function (eventName) {
        return (eventName === 'step') || (eventName === 'poststep');
    };

    const GetValue$4 = phaser.Utils.Objects.GetValue;
    const Clamp = phaser.Math.Clamp;

    class Timer {
        constructor(config) {
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.state = GetValue$4(o, 'state', IDLE);
            this.timeScale = GetValue$4(o, 'timeScale', 1);
            this.delay = GetValue$4(o, 'delay', 0);
            this.repeat = GetValue$4(o, 'repeat', 0);
            this.repeatCounter = GetValue$4(o, 'repeatCounter', 0);
            this.repeatDelay = GetValue$4(o, 'repeatDelay', 0);
            this.duration = GetValue$4(o, 'duration', 0);
            this.nowTime = GetValue$4(o, 'nowTime', 0);
            this.justRestart = GetValue$4(o, 'justRestart', false);
        }

        toJSON() {
            return {
                state: this.state,
                timeScale: this.timeScale,
                delay: this.delay,
                repeat: this.repeat,
                repeatCounter: this.repeatCounter,
                repeatDelay: this.repeatDelay,
                duration: this.duration,
                nowTime: this.nowTime,
                justRestart: this.justRestart,
            }
        }

        destroy() {

        }

        setTimeScale(timeScale) {
            this.timeScale = timeScale;
            return this;
        }

        setDelay(delay) {
            if (delay === undefined) {
                delay = 0;
            }
            this.delay = delay;
            return this;
        }

        setDuration(duration) {
            this.duration = duration;
            return this;
        }

        setRepeat(repeat) {
            this.repeat = repeat;
            return this;
        }

        setRepeatInfinity() {
            this.repeat = -1;
            return this;
        }

        setRepeatDelay(repeatDelay) {
            this.repeatDelay = repeatDelay;
            return this;
        }

        start() {
            this.nowTime = (this.delay > 0) ? -this.delay : 0;
            this.state = (this.nowTime >= 0) ? COUNTDOWN : DELAY;
            this.repeatCounter = 0;
            return this;
        }

        stop() {
            this.state = IDLE;
            return this;
        }

        update(time, delta) {
            if (this.state === IDLE || this.state === DONE ||
                delta === 0 || this.timeScale === 0
            ) {
                return;
            }

            this.nowTime += (delta * this.timeScale);
            this.justRestart = false;
            if (this.nowTime >= this.duration) {
                if ((this.repeat === -1) || (this.repeatCounter < this.repeat)) {
                    this.repeatCounter++;
                    this.justRestart = true;
                    this.nowTime -= this.duration;
                    if (this.repeatDelay > 0) {
                        this.nowTime -= this.repeatDelay;
                        this.state = REPEATDELAY;
                    }
                } else {
                    this.nowTime = this.duration;
                    this.state = DONE;
                }
            } else if (this.nowTime >= 0) {
                this.state = COUNTDOWN;
            }
        }

        get t() {
            var t;
            switch (this.state) {
                case IDLE:
                case DELAY:
                case REPEATDELAY:
                    t = 0;
                    break;

                case COUNTDOWN:
                    t = this.nowTime / this.duration;
                    break;

                case DONE:
                    t = 1;
                    break;
            }
            return Clamp(t, 0, 1);
        }

        set t(value) {
            value = Clamp(value, -1, 1);
            if (value < 0) {
                this.state = DELAY;
                this.nowTime = -this.delay * value;
            } else {
                this.state = COUNTDOWN;
                this.nowTime = this.duration * value;

                if ((value === 1) && (this.repeat !== 0)) {
                    this.repeatCounter++;
                }
            }
        }

        setT(t) {
            this.t = t;
            return this;
        }

        get isIdle() {
            return this.state === IDLE;
        }

        get isDelay() {
            return this.state === DELAY;
        }

        get isCountDown() {
            return this.state === COUNTDOWN;
        }

        get isRunning() {
            return this.state === DELAY || this.state === COUNTDOWN;
        }

        get isDone() {
            return this.state === DONE;
        }

        get isOddIteration() {
            return (this.repeatCounter & 1) === 1;
        }

        get isEvenIteration() {
            return (this.repeatCounter & 1) === 0;
        }

    }

    const IDLE = 0;
    const DELAY = 1;
    const COUNTDOWN = 2;
    const REPEATDELAY = 3;
    const DONE = -1;

    class TimerTickTask extends SceneUpdateTickTask {
        constructor(parent, config) {
            super(parent, config);
            this.timer = new Timer();
            // boot() later 
        }

        // override
        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            super.shutdown(fromScene);
            this.timer.destroy();
            this.timer = undefined;
        }

        start() {
            this.timer.start();
            super.start();
            return this;
        }

        stop() {
            this.timer.stop();
            super.stop();
            return this;
        }

        complete() {
            this.timer.stop();
            super.complete();
            return this;
        }

    }

    const GetValue$3 = phaser.Utils.Objects.GetValue;
    const GetAdvancedValue = phaser.Utils.Objects.GetAdvancedValue;
    const GetEaseFunction = phaser.Tweens.Builders.GetEaseFunction;

    class EaseValueTaskBase extends TimerTickTask {
        resetFromJSON(o) {
            this.timer.resetFromJSON(GetValue$3(o, 'timer'));
            this.setEnable(GetValue$3(o, 'enable', true));
            this.setTarget(GetValue$3(o, 'target', this.parent));
            this.setDelay(GetAdvancedValue(o, 'delay', 0));
            this.setDuration(GetAdvancedValue(o, 'duration', 1000));
            this.setEase(GetValue$3(o, 'ease', 'Linear'));
            this.setRepeat(GetValue$3(o, 'repeat', 0));

            return this;
        }

        setEnable(e) {
            if (e == undefined) {
                e = true;
            }
            this.enable = e;
            return this;
        }

        setTarget(target) {
            if (target === undefined) {
                target = this.parent;
            }
            this.target = target;
            return this;
        }

        setDelay(time) {
            this.delay = time;
            // Assign `this.timer.setRepeat(repeat)` manually
            return this;
        }

        setDuration(time) {
            this.duration = time;
            return this;
        }

        setRepeat(repeat) {
            this.repeat = repeat;
            // Assign `this.timer.setRepeat(repeat)` manually
            return this;
        }

        setRepeatDelay(repeatDelay) {
            this.repeatDelay = repeatDelay;
            // Assign `this.timer.setRepeatDelay(repeatDelay)` manually
            return this;
        }

        setEase(ease) {
            if (ease === undefined) {
                ease = 'Linear';
            }
            this.ease = ease;
            this.easeFn = GetEaseFunction(ease);
            return this;
        }

        // Override
        start() {
            // Ignore start if timer is running, i.e. in DELAY, o RUN state
            if (this.timer.isRunning) {
                return this;
            }

            super.start();
            return this;
        }

        restart() {
            this.timer.stop();
            this.start.apply(this, arguments);
            return this;
        }

        stop(toEnd) {
            if (toEnd === undefined) {
                toEnd = false;
            }

            super.stop();

            if (toEnd) {
                this.timer.setT(1);
                this.updateTarget(this.target, this.timer);
                this.complete();
            }

            return this;
        }

        update(time, delta) {
            if (
                (!this.isRunning) ||
                (!this.enable) ||
                (this.parent.hasOwnProperty('active') && !this.parent.active)
            ) {
                return this;
            }

            var target = this.target,
                timer = this.timer;

            timer.update(time, delta);

            // isDelay, isCountDown, isDone
            if (!timer.isDelay) {
                this.updateTarget(target, timer);
            }

            this.emit('update', target, this);

            if (timer.isDone) {
                this.complete();
            }

            return this;
        }

        // Override
        updateTarget(target, timer) {

        }
    }

    const GetValue$2 = phaser.Utils.Objects.GetValue;
    const Linear = phaser.Math.Linear;

    class Flip extends EaseValueTaskBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;
            // this.timer

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);
            this.setEase(GetValue$2(o, 'ease', 'Cubic'));

            this.setFrontToBackDirection(GetValue$2(o, 'frontToBack', 0));
            this.setBackToFrontDirection(GetValue$2(o, 'backToFront', 1));
            return this;
        }

        setFrontToBackDirection(direction) {
            if (typeof (direction) === 'string') {
                direction = DIRMODE[direction];
            }
            this.endAngleFB = (direction === 0) ? 180 : -180;
            return this;
        }

        setBackToFrontDirection(direction) {
            if (typeof (direction) === 'string') {
                direction = DIRMODE[direction];
            }
            this.endAngleBF = (direction === 0) ? -180 : 180;
            return this;
        }

        start(duration, repeat) {
            if (this.timer.isRunning) {
                return this;
            }

            this.timer
                .setDelay(this.delay)
                .setDuration(duration);

            var loop = repeat + 1;
            var gameObject = this.parent;
            if (gameObject.face === 0) {  // isFrontToBack
                this.startAngle = 0;
                this.endAngle = this.endAngleFB * loop;
            } else {
                this.startAngle = this.endAngleBF;
                this.endAngle = this.startAngle - (this.endAngleBF * loop);
            }

            super.start();
            return this;
        }

        flip(duration, repeat) {
            if (this.isRunning) {
                return this;
            }
            if (duration === undefined) {
                duration = this.duration;
            }
            if (repeat === undefined) {
                repeat = 0;
            }

            this.start(duration, repeat);
            this.emit('start', this.parent, this);

            // Set face index
            this.parent.currentFaceIndex = (this.parent.currentFaceIndex + repeat + 1) % 2;
            return this;
        }

        flipRight(duration, repeat) {
            if (this.parent.currentFaceIndex === 0) { // Front to back
                this.setFrontToBackDirection(0);
            } else {  // Back to front
                this.setBackToFrontDirection(0);
            }
            this.flip(duration, repeat);
            return this;
        }

        flipLeft(duration, repeat) {
            if (this.parent.currentFaceIndex === 0) { // Front to back
                this.setFrontToBackDirection(1);
            } else {  // Back to front
                this.setBackToFrontDirection(1);
            }
            this.flip(duration, repeat);
            return this;
        }

        updateTarget(gameObject, timer) {
            var t = this.easeFn(timer.t);

            var value = Linear(this.startAngle, this.endAngle, t);
            if (gameObject.orientation === 0) {
                gameObject.angleY = value;
            } else {
                gameObject.angleX = value;
            }
        }
    }

    const DIRMODE = {
        'right': 0,
        'left-to-right': 0,
        'left': 1,
        'right-to-left': 1
    };

    const IsPlainObject = phaser.Utils.Objects.IsPlainObject;
    const GetValue$1 = phaser.Utils.Objects.GetValue;

    const FaceNames = ['back', 'front'];

    class Card extends FaceContainer {
        constructor(scene, x, y, config) {
            if (IsPlainObject(x)) {
                config = x;
                x = GetValue$1(config, 'x', 0);
                y = GetValue$1(config, 'y', 0);
            }

            var faces = CreateFaces(scene, config, FaceNames);
            var backFace = faces.back;
            var frontFace = faces.front;

            var width = GetValue$1(config, 'width');
            var height = GetValue$1(config, 'height');
            if ((width === undefined) || (height === undefined)) {
                if (width === undefined) {
                    var frontFaceWidth = (frontFace) ? frontFace.width : 0;
                    var backFaceWidth = (backFace) ? backFace.width : 0;
                    width = Math.max(frontFaceWidth, backFaceWidth);
                }

                if (height === undefined) {
                    var frontFaceHeight = (frontFace) ? frontFace.height : 0;
                    var backFaceHeight = (backFace) ? backFace.height : 0;
                    height = Math.max(frontFaceHeight, backFaceHeight);
                }
            }

            super(scene, x, y, width, height, faces);
            this.type = 'rexPerspectiveCard';

            this.frontFaceRotationX = 0;
            this.frontFaceRotationY = 0;
            this.frontFaceRotationZ = 0;

            ForEachFace(faces, function (face, name) {
                this[`${name}Face`] = face;
            }, this);

            var flipConfig = GetValue$1(config, 'flip', undefined);
            if (flipConfig !== false) {
                this.flip = new Flip(this, flipConfig);
            }

            this.setOrientation(GetValue$1(config, 'orientation', 0));
            LayoutFaces(this, faces);

            this.setFace(GetValue$1(config, 'face', 0));
        }

        get rotationX() {
            return this.frontFaceRotationX;
        }

        set rotationX(value) {
            if (this.frontFaceRotationX === value) {
                return;
            }

            var delta = value - this.frontFaceRotationX;
            this.frontFaceRotationX = value;
            ForEachFace(this.faces, function (face) {
                face.rotationX += delta;
            }, null, true);
        }

        get rotationY() {
            return this.frontFaceRotationY;
        }

        set rotationY(value) {
            if (this.frontFaceRotationY === value) {
                return;
            }

            var delta = value - this.frontFaceRotationY;
            this.frontFaceRotationY = value;
            ForEachFace(this.faces, function (face) {
                face.rotationY += delta;
            }, null, true);
        }

        get rotationZ() {
            return this.frontFaceRotationZ;
        }

        set rotationZ(value) {
            if (this.frontFaceRotationZ === value) {
                return;
            }

            var delta = value - this.frontFaceRotationZ;
            this.frontFaceRotationZ = value;
            ForEachFace(this.faces, function (face) {
                face.rotationZ += delta;
            }, null, true);
        }

        setOrientation(orientation) {
            if (typeof (orientation) === 'string') {
                orientation = ORIENTATIONMODE[orientation];
            }
            this.orientation = orientation;
            return this;
        }

        get face() {
            return this.currentFaceIndex;
        }

        set face(index) {
            if (typeof (index) === 'string') {
                index = FACEMODE[index];
            }
            this.currentFaceIndex = index;

            var isBackFace = (index === 1);
            var angle = (isBackFace) ? 180 : 0;
            if (this.orientation === 0) {  // Flip around Y
                this.angleY = angle;
            } else {  // Flip around X
                this.angleX = angle;
            }
        }

        setFace(face) {
            this.face = face;
            return this;
        }

        toggleFace() {
            var newFace = (this.face === 0) ? 1 : 0;
            this.setFace(newFace);
            return this;
        }
    }

    const ORIENTATIONMODE = {
        x: 0,
        horizontal: 0,
        h: 0,

        y: 1,
        vertical: 1,
        v: 1
    };

    const FACEMODE = {
        front: 0,
        back: 1,
    };

    function PerspectiveCardFactory (x, y, config) {
        var gameObject = new Card(this.scene, x, y, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const BuildGameObject = phaser.GameObjects.BuildGameObject;

    function PerspectiveCardCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var gameObject = new Card(this.scene, 0, 0, config);
        BuildGameObject(this.scene, gameObject, config);

        return gameObject;
    }

    const GetValue = phaser.Utils.Objects.GetValue;

    var Init = function (parentContainer, rtOwner, config) {
        rtOwner.visibleSibling = [];
        rtOwner.isRunning = false;
        rtOwner.useParentBounds = GetValue(config, 'useParentBounds', false);

        rtOwner
            .setPosition(parentContainer.x, parentContainer.y)
            .setVisible(false);
        parentContainer.pin(rtOwner);
    };

    var Exit = function (parentContainer, rtOwner) {
        if (!parentContainer) {
            return false;
        }

        var visibleSibling = rtOwner.visibleSibling;
        // Set all visible children back
        for (var i = 0, cnt = visibleSibling.length; i < cnt; i++) {
            parentContainer.setChildVisible(visibleSibling[i], true);
        }
        visibleSibling.length = 0;

        // Set rtOwner to be invisible
        parentContainer.setChildVisible(rtOwner, false);

        rtOwner.isRunning = false;

        return true;
    };

    var Enter = function (parentContainer, rtOwner) {
        if (!parentContainer) {
            return false;
        }

        Exit(parentContainer, rtOwner);

        // Get and paste all visible children, which dose not include this render texture
        var useParentBounds = rtOwner.useParentBounds;
        Snapshot({
            gameObjects: parentContainer.getAllVisibleChildren(),
            renderTexture: rtOwner.rt,
            x: rtOwner.x,
            y: rtOwner.y,
            width: ((useParentBounds) ? parentContainer.displayWidth : undefined),
            height: ((useParentBounds) ? parentContainer.displayHeighth : undefined),
            originX: ((useParentBounds) ? parentContainer.originX : undefined),
            originY: ((useParentBounds) ? parentContainer.originY : undefined),
        });

        // Set rtOwner to be visible
        parentContainer.setChildVisible(rtOwner, true);

        // Set visible sibling to be invisible
        var visibleSibling = rtOwner.visibleSibling;
        var children = parentContainer.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if ((child.visible) && (child !== rtOwner)) {
                parentContainer.setChildVisible(child, false);
                visibleSibling.push(child);
            }
        }

        rtOwner.isRunning = true;

        return true;
    };

    var MeshRenderTextureBase = function (RenderTextureOwnerClass) {
        return class Base extends RenderTextureOwnerClass {
            constructor(parentContainer, config) {
                var scene = parentContainer.scene;
                super(scene, 0, 0, 1, 1, config);
                scene.add.existing(this);

                Init(parentContainer, this, config);
            }

            destroy(fromScene) {
                if (!this.scene || this.ignoreDestroy) {
                    return;
                }

                this.exit();
                super.destroy(fromScene);
            }

            enter() {
                var result = Enter(this.rexContainer.parent, this);
                if (result) {
                    this.setSizeToFrame();
                }
                return this;
            }

            exit() {
                Exit(this.rexContainer.parent, this);
                return this;
            }
        }
    };

    class ContainerPerspective extends MeshRenderTextureBase(RenderTexture$1) {
        get perspectiveState() {
            return this.isRunning;
        }
    }

    var IsNil = function (value) {
        return value === null || value === undefined;
    };

    var IsObjectLike = function (value) {
        return value !== null && typeof value === 'object';
    };

    var NormalizePath = function (path, delimiter) {
        if (Array.isArray(path)) ; else if (typeof path !== 'string') {
            path = [];
        } else if (path.trim() === '') {
            path = [];
        } else {
            path = path.split(delimiter).filter(Boolean);
        }
        return path;
    };

    /**
     * Set a nested value into target by path (mutates target).
     *
     * - If keys is a string and does NOT contain delimiter, write directly.
     * - Intermediate non-plain-object values are always overwritten with {}.
     *
     * @param {object} target
     * @param {string|string[]} keys
     * @param {*} value
     * @param {string} [delimiter='.']
     * @returns {object} the same target reference
     */
    var SetValue = function (target, keys, value, delimiter = '.') {
        if (!IsObjectLike(target)) {
            return target;
        }

        // Invalid key: no-op; don't replace root
        if (IsNil(keys) || keys === '' || (Array.isArray(keys) && keys.length === 0)) {
            return target;
        }

        // Fast path: single key
        if (
            (typeof keys === 'string' && keys.indexOf(delimiter) === -1) ||
            (typeof keys === 'number')
        ) {
            target[keys] = value;
            return target;
        }

        var pathSegments = NormalizePath(keys, delimiter);
        if (pathSegments.length === 0) {
            return target;
        }

        var cursor = target;
        var pathSegmentsCount = pathSegments.length;

        for (var index = 0; index < pathSegmentsCount - 1; index++) {
            var segment = pathSegments[index];
            var next = cursor[segment];

            if (!IsObjectLike(next)) {
                // Force overwrite intermediates
                cursor[segment] = {};
            }

            cursor = cursor[segment];
        }

        cursor[pathSegments[pathSegmentsCount - 1]] = value;
        return target;
    };

    class PerspectiveImagePlugin extends phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexPerspectiveImage', PerspectiveImageFactory, PerspectiveImageCreator);
            pluginManager.registerGameObject('rexPerspectiveRenderTexture', PerspectiveRenderTextureFactory, PerspectiveRenderTextureCreator);        
            pluginManager.registerGameObject('rexPerspectiveCard', PerspectiveCardFactory, PerspectiveCardCreator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        addContainerPerspective(parentContainer, config) {
            return new ContainerPerspective(parentContainer, config);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.PerspectiveImage', Image);
    SetValue(window, 'RexPlugins.GameObjects.PerspectiveRenderTexture', RenderTexture$1);
    SetValue(window, 'RexPlugins.GameObjects.PerspectiveCard', Card);

    SetValue(window, 'RexPlugins.GameObjects.ContainerPerspective', ContainerPerspective);

    return PerspectiveImagePlugin;

}));
