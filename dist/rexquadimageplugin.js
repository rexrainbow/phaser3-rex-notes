(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('phaser')) :
    typeof define === 'function' && define.amd ? define(['phaser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexquadimageplugin = factory(global.Phaser));
})(this, (function (phaser) { 'use strict';

    const Mesh2D$2 = phaser.GameObjects.Mesh2D;

    var WebGLRenderer = function (renderer, src, drawingContext, parentMatrix) {
        if (!src) {
            src = this;
        }

        if (src.skipRender()) {
            return;
        }

        Mesh2D$2.prototype.renderWebGL.call(this, renderer, src, drawingContext, parentMatrix);

        if (src.debugCallback) {
            src.runDebugCallback(drawingContext, parentMatrix);
        }
    };

    var SkipRender = function () {
        return false;
    };

    var Render = {
        renderWebGL: WebGLRenderer,
        skipRender: SkipRender,
    };

    const RotateAround$2 = phaser.Math.RotateAround;

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
        RotateAround$2(out, 0, 0, gameObject.rotation);
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
        RotateAround$2(out, 0, 0, -gameObject.rotation);
        out.x += ox;
        out.y += oy;

        return out;
    };

    var GlobalXY$1 = {};

    const Linear = phaser.Math.Linear;
    const RotateAround$1 = phaser.Math.RotateAround;

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
            this.frameU = Linear(frameU0, frameU1, this.u);
            this.frameV = Linear(frameV0, frameV1, this.v);
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
            RotateAround$1(GlobalXY, ox, oy, rotation);
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

    var VertexMethods = {
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
    };

    var IndexMethods = {
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
        },

        setMeshIndices(indices) {
            this.indices.length = 0;
            this.faceIndices.length = 0;

            for (var i = 0, cnt = indices.length; i < cnt; i += 4) {
                this.indices.push(indices[i], indices[i + 1], indices[i + 2], indices[i + 3]);
                this.faceIndices.push(indices[i], indices[i + 1], indices[i + 2]);
            }

            this.updateOrderedIndices();

            return this;
        },

        setUseOrderedIndexOptimization(enabled, strategy) {
            this.autoBuildOrderedIndices = !!enabled;

            if (strategy !== undefined) {
                this.orderedIndicesStrategy = strategy;
            }

            return this.updateOrderedIndices();
        },

        setUseOrderedIndicesOptimization(enabled, strategy) {
            return this.setUseOrderedIndexOptimization(enabled, strategy);
        },

        updateOrderedIndices() {
            if (this.autoBuildOrderedIndices && this.indices.length > 0) {
                this.setRenderAsTriangles(false);
                this.buildOrderedIndices(this.orderedIndicesStrategy, true);
            } else {
                this.setUseOrderedIndices(false);
            }

            return this;
        },
    };

    const Mesh2D$1 = phaser.GameObjects.Mesh2D;

    var FrameMethods = {
        setTexture(key, frame) {
            Mesh2D$1.prototype.setTexture.call(this, key, frame);

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
            Mesh2D$1.prototype.updateDisplayOrigin.call(this);

            if (this.vertexObjects) {
                this.writeVertexObjectPositions();
            }

            return this;
        },

        setDisplayOrigin(x, y) {
            Mesh2D$1.prototype.setDisplayOrigin.call(this, x, y);

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
    };

    const GetCalcMatrix = phaser.GameObjects.GetCalcMatrix;

    var DebugMethods = {
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
        },

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
        },

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
        },
    };

    var Methods = {};

    Object.assign(
        Methods,
        VertexMethods,
        IndexMethods,
        FrameMethods,
        DebugMethods,
    );

    const Mesh2D = phaser.GameObjects.Mesh2D;
    const IsPlainObject$4 = phaser.Utils.Objects.IsPlainObject;
    const GetValue$6 = phaser.Utils.Objects.GetValue;

    let Image$1 = class Image extends Mesh2D {
        constructor(scene, x, y, key, frame, config) {
            if (IsPlainObject$4(x)) {
                config = x;
                x = GetValue$6(config, 'x', 0);
                y = GetValue$6(config, 'y', 0);
                key = GetValue$6(config, 'key', '__DEFAULT');
                frame = GetValue$6(config, 'frame', null);
            }

            if (x === undefined) { x = 0; }
            if (y === undefined) { y = 0; }
            if (key === undefined || key === null) { key = '__DEFAULT'; }

            super(scene, x, y, key, [], [], GetValue$6(config, 'flipV', false));

            this.type = 'rexMeshImage';

            // Keep Mesh2D#vertices as the renderer-facing flat [x, y, u, v] array.
            this.vertexObjects = [];
            this.faceIndices = [];
            this.texturePage = GetValue$6(config, 'texturePage', 0);
            this.autoBuildOrderedIndices = GetValue$6(config, 'useOrderedIndices', false);
            this.orderedIndicesStrategy = GetValue$6(config, 'orderedIndicesStrategy', 2);
            this.debugCallback = null;
            this.debugGraphic = null;

            this.setRenderAsTriangles(GetValue$6(config, 'renderAsTriangles', false));
            this.setUseOrderedIndices(this.autoBuildOrderedIndices);

            if (frame !== undefined && frame !== null) {
                this.setFrame(frame);
            }

            this.setSizeToFrame();
            this.setOriginFromFrame();
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
    };

    Object.assign(
        Image$1.prototype,
        Render,
        Methods
    );

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

    const IsPlainObject$3 = phaser.Utils.Objects.IsPlainObject;
    const GetValue$5 = phaser.Utils.Objects.GetValue;

    class Image extends Sprite {
        constructor(scene, x, y, key, frame, config) {
            if (IsPlainObject$3(x)) {
                config = x;
                x = GetValue$5(config, 'x', 0);
                y = GetValue$5(config, 'y', 0);
                key = GetValue$5(config, 'key', null);
                frame = GetValue$5(config, 'frame', null);
            }

            if (config === undefined) {
                config = {};
            }
            if (config.renderAsTriangles === undefined) {
                config.renderAsTriangles = true;
            }
            if (config.useOrderedIndices === undefined) {
                config.useOrderedIndices = false;
            }

            super(scene, x, y, key, frame, config);
            this.type = 'rexQuadImage';
            this.isNinePointMode = GetValue$5(config, 'ninePointMode', false);
            this.fourPointsModeRTL = GetValue$5(config, 'rtl', false);

            this.initVertices();
        }

        initVertices() {
            var isNinePointMode = this.isNinePointMode;
            var pointsPerSide = (isNinePointMode) ? 3 : 2;
            var vertices = [];

            for (var r = 0; r < pointsPerSide; r++) {
                for (var c = 0; c < pointsPerSide; c++) {
                    var vertex = this.createVertexObject(c / (pointsPerSide - 1), r / (pointsPerSide - 1));
                    vertices.push(vertex);
                }
            }

            if (isNinePointMode) {
                this.setFaceIndices(NinePointsIndices);

                this.topLeft = vertices[0];
                this.topCenter = vertices[1];
                this.topRight = vertices[2];
                this.centerLeft = vertices[3];
                this.center = vertices[4];
                this.centerRight = vertices[5];
                this.bottomLeft = vertices[6];
                this.bottomCenter = vertices[7];
                this.bottomRight = vertices[8];
            } else {
                this.setFaceIndices((!this.fourPointsModeRTL) ? FourPointsIndices : FourPointsIndicesRTL);

                this.topLeft = vertices[0];
                this.topRight = vertices[1];
                this.bottomLeft = vertices[2];
                this.bottomRight = vertices[3];
            }

            return this;
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            super.destroy(fromScene);
        }
    }

    /*
    0, 1,
    2, 3,
    */
    const FourPointsIndices = [
        0, 2, 3,
        0, 3, 1
    ];

    const FourPointsIndicesRTL = [
        1, 3, 2,
        1, 2, 0
    ];

    /*
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
    */
    const NinePointsIndices = [
        0, 3, 4,
        0, 4, 1,
        1, 4, 2,
        4, 5, 2,
        3, 6, 4,
        6, 7, 4,
        4, 7, 8,
        4, 8, 5
    ];

    function QuadImageFactory (x, y, texture, frame, config) {
        var gameObject = new Image(this.scene, x, y, texture, frame, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue$3 = phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject$3 = phaser.GameObjects.BuildGameObject;

    function QuadImageCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var key = GetAdvancedValue$3(config, 'key', null);
        var frame = GetAdvancedValue$3(config, 'frame', null);
        var gameObject = new Image(this.scene, 0, 0, key, frame, config);
        BuildGameObject$3(this.scene, gameObject, config);

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
    const RotateAround = phaser.Math.RotateAround;
    const P3Container = phaser.GameObjects.Container;

    var GetBounds = function (gameObject, output) {
        if (output === undefined) {
            output = new Rectangle$1();
        } else if (output === true) {
            if (GlobRect$1 === undefined) {
                GlobRect$1 = new Rectangle$1();
            }
            output = GlobRect$1;
        }

        if (gameObject.getBounds && !(gameObject instanceof P3Container)) {
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
            RotateAround(output, gameObject.x, gameObject.y, gameObject.rotation);
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
    const LayerClass = phaser.GameObjects.Layer;

    var IsGameObject = function (object) {
        return (object instanceof GameObjectClass) || (object instanceof LayerClass);
    };

    var GetValue$4 = phaser.Utils.Objects.GetValue;

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
        var x = GetValue$4(config, 'x', undefined);
        var y = GetValue$4(config, 'y', undefined);
        var width = GetValue$4(config, 'width', undefined);
        var height = GetValue$4(config, 'height', undefined);
        var originX = GetValue$4(config, 'originX', 0);
        var originY = GetValue$4(config, 'originY', 0);
        var padding = GetValue$4(config, 'padding', 0);

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
    const GetValue$3 = phaser.Utils.Objects.GetValue;

    class RenderTexture extends Image {
        constructor(scene, x, y, width, height, config) {
            if (IsPlainObject$2(x)) {
                config = x;
                x = GetValue$3(config, 'x', 0);
                y = GetValue$3(config, 'y', 0);
                width = GetValue$3(config, 'width', 32);
                height = GetValue$3(config, 'height', 32);
            }

            // Dynamic-texture -> quad-image
            var texture = CreateDynamicTexture(scene, width, height);

            super(scene, x, y, texture, null, config);
            this.type = 'rexQuadRenderTexture';
            this.rt = this.texture;

            var self = this;
            InstallRTSetSizeHook(this.rt, function(){
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
            super.setSizeToFrame(frame);

            this.updateDisplayOrigin();

            var vertexObjects = this.vertexObjects;

            for (var i = 0, cnt = vertexObjects.length; i < cnt; i++) {
                this.updateVertexObjectFrame(vertexObjects[i]);
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
    }

    function QuadRenderTextureFactory (x, y, width, height, config) {
        var gameObject = new RenderTexture(this.scene, x, y, width, height, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue$2 = phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject$2 = phaser.GameObjects.BuildGameObject;

    function QuadRenderTextureCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var width = GetAdvancedValue$2(config, 'width', 32);
        var height = GetAdvancedValue$2(config, 'height', 32);
        var gameObject = new RenderTexture(this.scene, 0, 0, width, height, config);
        BuildGameObject$2(this.scene, gameObject, config);

        return gameObject;
    }

    var Skew = function (gameObject, skewX, skewY) {
        if (skewX === undefined) {
            skewX = 0;
        }
        if (skewY === undefined) {
            skewY = 0;
        }

        var ox = gameObject.displayOriginX;
        var oy = gameObject.displayOriginY;
        var xOffset = Math.tan(skewX) * oy;
        var yOffset = Math.tan(skewY) * ox;
        var vertices = gameObject.vertexObjects;
        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
            var vertex = vertices[i];
            var frameX = vertex.frameX;
            var frameY = vertex.frameY;

            if (frameY > oy) {
                vertex.localX = frameX + xOffset;
            } else if (frameY < oy) {
                vertex.localX = frameX - xOffset;
            }

            if (frameX > ox) {
                vertex.localY = frameY + yOffset;
            } else if (frameX < ox) {
                vertex.localY = frameY - yOffset;
            }
        }
    };

    const IsPlainObject$1 = phaser.Utils.Objects.IsPlainObject;
    const GetValue$2 = phaser.Utils.Objects.GetValue;
    const DegToRad = phaser.Math.DegToRad;
    const RadToDeg = phaser.Math.RadToDeg;

    class SkewImage extends Image {
        constructor(scene, x, y, key, frame, config) {
            if (IsPlainObject$1(x)) {
                config = x;
                x = GetValue$2(config, 'x', 0);
                y = GetValue$2(config, 'y', 0);
                key = GetValue$2(config, 'key', null);
                frame = GetValue$2(config, 'frame', null);
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
                config.orderedIndicesStrategy = 2;
            }

            super(scene, x, y, key, frame, config);
            this.type = 'rexSkewmage';

            this._skewX = 0;
            this._skewY = 0;
        }

        get skewX() {
            return this._skewX;
        }

        set skewX(value) {
            this._skewX = value;
            Skew(this, this._skewX, this._skewY);
        }

        get skewXDeg() {
            return RadToDeg(this._skewX);
        }

        set skewXDeg(value) {
            this.skewX = DegToRad(value);
        }

        get skewY() {
            return this._skewY;
        }

        set skewY(value) {
            this._skewY = value;
            Skew(this, this._skewX, this._skewY);
        }

        get skewYDeg() {
            return RadToDeg(this._skewY);
        }

        set skewYDeg(value) {
            this.skewY = DegToRad(value);
        }

        setSkewX(skewX) {
            this.skewX = skewX;
            return this;
        }

        setSkewY(skewY) {
            this.skewY = skewY;
            return this;
        }

        setSkew(skewX, skewY) {
            if (skewY === undefined) {
                skewY = skewX;
            }
            this.skewX = skewX;
            this.skewY = skewY;
            return this;
        }

        setSkewXDeg(skewX) {
            this.skewXDeg = skewX;
            return this;
        }

        setSkewYDeg(skewY) {
            this.skewYDeg = skewY;
            return this;
        }

        setSkewDeg(skewX, skewY) {
            if (skewY === undefined) {
                skewY = skewX;
            }
            this.skewXDeg = skewX;
            this.skewYDeg = skewY;
            return this;
        }

    }

    function SkewImageFactory (x, y, texture, frame, config) {
        var gameObject = new SkewImage(this.scene, x, y, texture, frame, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue$1 = phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject$1 = phaser.GameObjects.BuildGameObject;

    function SkewImageCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var key = GetAdvancedValue$1(config, 'key', null);
        var frame = GetAdvancedValue$1(config, 'frame', null);
        var gameObject = new SkewImage(this.scene, 0, 0, key, frame, config);
        BuildGameObject$1(this.scene, gameObject, config);

        return gameObject;
    }

    const IsPlainObject = phaser.Utils.Objects.IsPlainObject;
    const GetValue$1 = phaser.Utils.Objects.GetValue;

    class SkewRenderTexture extends SkewImage {
        constructor(scene, x, y, width, height) {
            if (IsPlainObject(x)) {
                var config = x;
                x = GetValue$1(config, 'x', 0);
                y = GetValue$1(config, 'y', 0);
                width = GetValue$1(config, 'width', 32);
                height = GetValue$1(config, 'height', 32);
            }

            // dynamic-texture -> quad-image
            var texture = CreateDynamicTexture(scene, width, height);

            super(scene, x, y, texture, null);
            this.type = 'rexSkewRenderTexture';
            this.rt = this.texture;
            
            var self = this;
            InstallRTSetSizeHook(this.rt, function(){
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
            super.setSizeToFrame(frame);

            this.updateDisplayOrigin();

            var vertexObjects = this.vertexObjects;

            for (var i = 0, cnt = vertexObjects.length; i < cnt; i++) {
                this.updateVertexObjectFrame(vertexObjects[i]);
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
    }

    function SkewRenderTextureFactory (x, y, width, height) {
        var gameObject = new SkewRenderTexture(this.scene, x, y, width, height);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue = phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject = phaser.GameObjects.BuildGameObject;

    function SkewRenderTextureCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var width = GetAdvancedValue(config, 'width', 32);
        var height = GetAdvancedValue(config, 'height', 32);
        var gameObject = new SkewRenderTexture(this.scene, 0, 0, width, height);
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

    class ContainerSkew extends MeshRenderTextureBase(SkewRenderTexture) {
        get skewState() {
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

    class QuadImagePlugin extends phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexQuadImage', QuadImageFactory, QuadImageCreator);
            pluginManager.registerGameObject('rexQuadRenderTexture', QuadRenderTextureFactory, QuadRenderTextureCreator);

            pluginManager.registerGameObject('rexSkewImage', SkewImageFactory, SkewImageCreator);
            pluginManager.registerGameObject('rexSkewRenderTexture', SkewRenderTextureFactory, SkewRenderTextureCreator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        addContainerSkew(parentContainer, config) {
            return new ContainerSkew(parentContainer, config);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.QuadImage', Image);
    SetValue(window, 'RexPlugins.GameObjects.QuadRenderTexture', RenderTexture);
    SetValue(window, 'RexPlugins.GameObjects.SkewImage', SkewImage);
    SetValue(window, 'RexPlugins.GameObjects.SkewRenderTexture', SkewRenderTexture);

    SetValue(window, 'RexPlugins.GameObjects.ContainerSkew', ContainerSkew);

    return QuadImagePlugin;

}));
