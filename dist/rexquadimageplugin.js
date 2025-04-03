(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexquadimageplugin = factory());
})(this, (function () { 'use strict';

    const GameObject = Phaser.GameObjects.GameObject;

    let Image$2 = class Image extends GameObject {
    };

    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Image$2,
        [
            Components.AlphaSingle,
            Components.BlendMode,
            Components.Depth,
            Components.Flip,
            Components.Mask,
            Components.Origin,
            Components.RenderNodes,
            Components.Size,
            Components.Texture,
            Components.Transform,
            Components.Visible,
            Components.ScrollFactor,
        ]
    );

    const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

    var renderOptions = {
        multiTexturing: false,
        smoothPixelArt: false
    };

    var WebGLRenderer = function (renderer, src, drawingContext, parentMatrix) {
        var camera = drawingContext.camera;
        camera.addToRenderList(src);

        if (src.skipRender()) {
            return;
        }

        var calcMatrix = GetCalcMatrix(src, camera, parentMatrix, !drawingContext.useCanvas).calc;

        if (src.dirty) {
            src.updateBuffers();
        }

        // Get smooth pixel art option.
        var smoothPixelArt;
        var srcTexture = src.texture;
        if (srcTexture && srcTexture.smoothPixelArt !== null) {
            smoothPixelArt = srcTexture.smoothPixelArt;
        }
        else {
            smoothPixelArt = src.scene.sys.game.config.smoothPixelArt;
        }
        renderOptions.smoothPixelArt = smoothPixelArt;

        (src.customRenderNodes.BatchHandler || src.defaultRenderNodes.BatchHandler).batchTriangles(
            drawingContext,
            src,
            calcMatrix,
            src.texture.source[0].glTexture,
            src.vertexBuffer,
            src.uvBuffer,
            src.colorBuffer,
            src.alphaBuffer,
            src.alpha,
            src.tintFill,
            renderOptions,
            src.debugCallback
        );
    };

    var CanvasRenderer = function (renderer, src, camera, parentMatrix) {
    };

    var SkipRender = function () {
        return this.faces.length === 0;
    };

    var Render = {
        renderWebGL: WebGLRenderer,
        renderCanvas: CanvasRenderer,
        skipRender: SkipRender,
    };

    const RotateAround$2 = Phaser.Math.RotateAround;

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

    const Linear = Phaser.Math.Linear;
    const RotateAround$1 = Phaser.Math.RotateAround;

    class Vertex {
        constructor() {
            this.parent = undefined;  // Mesh game object
            this.name = '';

            this.u = 0;
            this.v = 0;
            this.frameU = 0;
            this.frameV = 0;
            this.frameX = 0;
            this.frameY = 0;
            this._dx = 0;
            this._dy = 0;
            this.localX = 0;
            this.localY = 0;
            this.alpha = 1;
            this.color = 0xffffff;
        }

        setParent(parent) {
            this.parent = parent;
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

            if (this.parent) {
                this.parent.setUVDirtyFlag();
            }
        }

        get frameV() {
            return this._frameV;
        }

        set frameV(value) {
            if (this._frameV === value) {
                return;
            }
            this._frameV = value;

            if (this.parent) {
                this.parent.setUVDirtyFlag();
            }
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

            if (this.parent) {
                this.parent.setVertexDirtyFlag();
            }
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

            if (this.parent) {
                this.parent.setVertexDirtyFlag();
            }
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

            if (this.parent) {
                this.parent.setVertexDirtyFlag();
            }
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

            if (this.parent) {
                this.parent.setVertexDirtyFlag();
            }
        }

        get alpha() {
            return this._alpha;
        }

        set alpha(value) {
            if (this._alpha === value) {
                return;
            }
            this._alpha = value;

            if (this.parent) {
                this.parent.setAlphaDirtyFlag();
            }
        }

        get color() {
            return this._color;
        }

        set color(value) {
            if (this._color === value) {
                return;
            }
            this._color = value;

            if (this.parent) {
                this.parent.setColorDirtyFlag();
            }
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

        setFrameSize(frameWidth, frameHeight) {
            this.frameX = this.u * frameWidth;
            this.frameY = this.v * frameHeight;
            return this;
        }

        // Reset position to frame position
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
    }

    var GlobalXY = {};

    const InCenter = Phaser.Geom.Triangle.InCenter;

    var GetInCenter = function (face, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = GlobalOut;
        }

        GlobalTriangle.x1 = face.vertices[0].localX;
        GlobalTriangle.y1 = face.vertices[0].localY;
        GlobalTriangle.x2 = face.vertices[1].localX;
        GlobalTriangle.y2 = face.vertices[1].localY;
        GlobalTriangle.x3 = face.vertices[2].localX;
        GlobalTriangle.y3 = face.vertices[2].localY;

        return InCenter(GlobalTriangle, out);
    };

    var GlobalTriangle = {};
    var GlobalOut = {};

    var Contains$1 = function (face, x, y) {
        var vertices = face.vertices;
        var v0 = vertices[0];
        var v1 = vertices[1];
        var v2 = vertices[2];
        GlobTriangle.setTo(
            v0.localX, v0.localY,
            v1.localX, v1.localY,
            v2.localX, v2.localY,
        );

        return GlobTriangle.contains(x, y);
    };

    var GlobTriangle = new Phaser.Geom.Triangle();

    const RadToDeg$1 = Phaser.Math.RadToDeg;
    const DegToRad$1 = Phaser.Math.DegToRad;

    class Face {
        constructor(vertex0, vertex1, vertex2) {
            if (vertex0 === undefined) { vertex0 = new Vertex(); }
            if (vertex1 === undefined) { vertex1 = new Vertex(); }
            if (vertex2 === undefined) { vertex2 = new Vertex(); }

            this.parent = undefined;  // Mesh game object
            this.name = '';

            this.vertices = [vertex0, vertex1, vertex2];

            this._localOffsetX = 0;
            this._localOffsetY = 0;
            this._rotation = 0;
            this._alpha = 1;
            this._color = 0xffffff;
        }

        setParent(parent) {
            this.parent = parent;
            this.vertices[0].setParent(parent);
            this.vertices[1].setParent(parent);
            this.vertices[2].setParent(parent);

            return this;
        }

        setName(name) {
            this.name = name;
            return this;
        }

        get vertex0() {
            return this.vertices[0];
        }

        set vertex0(value) {
            this.vertices[0] = value;
        }

        get vertex1() {
            return this.vertices[1];
        }

        set vertex1(value) {
            this.vertices[1] = value;
        }

        get vertex2() {
            return this.vertices[2];
        }

        set vertex2(value) {
            this.vertices[2] = value;
        }

        get localOffsetX() {
            return this._localOffsetX;
        }

        set localOffsetX(value) {
            if (value === this._localOffsetX) {
                return;
            }
            this._localOffsetX = value;

            this.updateVerticesPosition();
        }

        get localOffsetY() {
            return this._localOffsetY;
        }

        set localOffsetY(value) {
            if (value === this._localOffsetY) {
                return;
            }
            this._localOffsetY = value;
            this.updateVerticesPosition();
        }

        get rotation() {
            return this._rotation;
        }

        set rotation(value) {
            if (value === this._rotation) {
                return;
            }

            this._rotation = value;

            var oxy = GetInCenter(this, true);
            var ox = oxy.x;
            var oy = oxy.y;

            this.vertices[0].rotateAround(ox, oy, value);
            this.vertices[1].rotateAround(ox, oy, value);
            this.vertices[2].rotateAround(ox, oy, value);
        }

        get angle() {
            return RadToDeg$1(this._rotation);
        }

        set angle(value) {
            this.rotation = DegToRad$1(value);
        }

        get alpha() {
            return this._alpha;
        }

        set alpha(value) {
            if (this._alpha === value) {
                return;
            }
            this._alpha = value;

            this.vertices[0].setAlpha(value);
            this.vertices[1].setAlpha(value);
            this.vertices[2].setAlpha(value);
        }

        get color() {
            return this._color;
        }

        set color(value) {
            if (this._color === value) {
                return;
            }
            this._color = value;

            this.vertices[0].setColor(value);
            this.vertices[1].setColor(value);
            this.vertices[2].setColor(value);
        }

        get isPositionModified() {
            return (this._localOffsetX !== 0) || (this._localOffsetY !== 0) || (this._rotation !== 0);
        }

        setUV(u0, v0, u1, v1, u2, v2) {
            this.vertices[0].setUV(u0, v0);
            this.vertices[1].setUV(u1, v1);
            this.vertices[2].setUV(u2, v2);

            return this;
        }

        setFrameUV(frameU0, frameV0, frameU1, frameV1) {
            this.vertices[0].setFrameUV(frameU0, frameV0, frameU1, frameV1);
            this.vertices[1].setFrameUV(frameU0, frameV0, frameU1, frameV1);
            this.vertices[2].setFrameUV(frameU0, frameV0, frameU1, frameV1);

            return this;
        }

        setFrameSize(frameWidth, frameHeight) {
            // Set local position of vertices by frameXY and dxy
            for (var i = 0, cnt = this.vertices.length; i < cnt; i++) {
                this.vertices[i].setFrameSize(frameWidth, frameHeight);
            }

            // Apply face offset, and rotation to vertices
            if (this.isPositionModified) {
                this.updateVerticesPosition();
            }
            return this;
        }

        setLocalOffset(x, y) {
            this.localOffsetX = x;
            this.localOffsetY = y;
            return this;
        }

        resetVerticesPosition() {
            for (var i = 0, cnt = this.vertices.length; i < cnt; i++) {
                this.vertices[i].resetPosition();
            }

            if (this.isPositionModified) {
                this.updateVerticesPosition();
            }
            return this;
        }

        updateVerticesPosition() {
            // Extract the horizontal offset of the Face to calculate the new vertex positions
            var offsetX = this._localOffsetX;
            // Extract the vertical offset of the Face to calculate the new vertex positions
            var offsetY = this._localOffsetY;

            var vertices = this.vertices;
            for (var i = 0, cnt = vertices.length; i < cnt; i++) {
                var vertex = vertices[i];
                // Update each vertex position based on frameX, frameY, and the Face's offsets
                // This process overrides the original dx and dy values, ensuring the relative distance between the three vertices is maintained
                vertex.setLocalPosition(vertex.frameX + offsetX, vertex.frameY + offsetY);
            }

            // Save the current rotation value to reapply after resetting rotation to 0
            var rotationSave = this.rotation;
            this._rotation = 0;
            this.rotation = rotationSave;

            return this;
        }

        setRotation(value) {
            this.rotation = value;
            return this;
        }

        setAngle(value) {
            this.angle = value;
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

        contains(localX, localY) {
            return Contains$1(this, localX, localY);
        }
    }

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
            sharedVertexMode = config.sharedVertexMode;
        }

        if (columns === undefined) {
            columns = 1;
        }
        if (rows === undefined) {
            rows = 1;
        }
        if (sharedVertexMode === undefined) {
            sharedVertexMode = false;
        }

        var faces = [];
        var vertices;

        if (sharedVertexMode) {
            vertices = [];
            for (var r = 0; r <= rows; r++) {
                for (var c = 0; c <= columns; c++) {
                    var vertex = gameObject.createVertex(c / columns, r / rows);
                    vertices.push(vertex);
                }
            }
        }

        var vertex0, vertex1, vertex2;
        var face;
        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < columns; c++) {
                if (sharedVertexMode) {
                    var indexTL = (r * (columns + 1)) + c,
                        indexTR = indexTL + 1,
                        indexBL = ((r + 1) * (columns + 1)) + c,
                        indexBR = indexBL + 1;

                    var vertexTL = vertices[indexTL];
                    var vertexTR = vertices[indexTR];
                    var vertexBL = vertices[indexBL];
                    var vertexBR = vertices[indexBR];

                    face = gameObject.createFace(vertexTL, vertexBR, vertexBL);
                    gameObject.addFace(face);
                    faces.push(face);

                    face = gameObject.createFace(vertexTL, vertexTR, vertexBR);
                    gameObject.addFace(face);
                    faces.push(face);

                } else {
                    var lx = c / columns,
                        rx = (c + 1) / columns,
                        ty = r / rows,
                        by = (r + 1) / rows;

                    vertex0 = gameObject.createVertex(lx, ty); // top-left
                    vertex1 = gameObject.createVertex(lx, by); // bottom-left
                    vertex2 = gameObject.createVertex(rx, by); // bottom-right
                    face = gameObject.createFace(vertex0, vertex1, vertex2);
                    gameObject.addFace(face);
                    faces.push(face);

                    vertex0 = gameObject.createVertex(lx, ty); // top-left
                    vertex1 = gameObject.createVertex(rx, by); // bottom-right
                    vertex2 = gameObject.createVertex(rx, ty); // top-right
                    face = gameObject.createFace(vertex0, vertex1, vertex2);
                    gameObject.addFace(face);
                    faces.push(face);
                }
            }
        }

        if (sharedVertexMode) {
            gameObject.vertices.sort(function (vertexA, vertexB) {
                if (vertexA.v === vertexB.v) {
                    return vertexA.u - vertexB.u;
                } else {
                    return vertexA.v - vertexB.v;
                }
            });
        }

        return faces;
    };

    const GetFirst = Phaser.Utils.Array.GetFirst;

    var VertexMethods = {
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
            });

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
                faces[i].setFrameSize(frameWidth, frameHeight);
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
    };

    const UPDATE_ARRAYS = (1 << 0);
    const UPDATE_UV = (1 << 1);
    const UPDATE_VERTEX = (1 << 2);
    const UPDATE_ALPHA = (1 << 3);
    const UPDATE_COLOR = (1 << 4);
    const UPDATE_ALL = UPDATE_ARRAYS | UPDATE_UV | UPDATE_VERTEX | UPDATE_ALPHA | UPDATE_COLOR;

    var DirtyFlagsMethods = {
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
    };

    var UpdateMethods = {
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

    };

    var TintMethods = {
        setTintFill(value) {
            if (value === undefined) {
                value = false;
            }
            this.tintFill = value;
            return this;
        },

        setTint(color) {
            this.tint = color;
            return this;
        },

        clearTint() {
            this.setTint(0xffffff);
            return this;
        }
    };

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
    };

    const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
    const TransformXY = Phaser.Math.TransformXY;

    var WorldXYToGameObjectLocalXY = function (gameObject, worldX, worldY, camera, out) {
        if (camera === undefined) {
            camera = gameObject.scene.cameras.main;
        }

        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globOut;
        }

        var csx = camera.scrollX;
        var csy = camera.scrollY;
        var px = worldX + (csx * gameObject.scrollFactorX) - csx;
        var py = worldY + (csy * gameObject.scrollFactorY) - csy;
        if (gameObject.parentContainer) {
            if (tempMatrix === undefined) {
                tempMatrix = new TransformMatrix();
                parentMatrix = new TransformMatrix();
            }

            gameObject.getWorldTransformMatrix(tempMatrix, parentMatrix);
            tempMatrix.applyInverse(px, py, out);
        }
        else {
            TransformXY(px, py, gameObject.x, gameObject.y, gameObject.rotation, gameObject.scaleX, gameObject.scaleY, out);
        }

        out.x += gameObject.displayOriginX;
        out.y += gameObject.displayOriginY;

        return out;
    };

    var tempMatrix, parentMatrix;
    var globOut = {};

    var PointMethods = {
        getFaceAt(worldX, worldY, camera) {
            var localXY = WorldXYToGameObjectLocalXY(this, worldX, worldY, camera, true);
            var localX = localXY.x,
                localY = localXY.y;
            var faces = this.faces;
            for (var i = 0, cnt = faces.length; i < cnt; i++) {
                var face = faces[i];
                if (face.contains(localX, localY)) {
                    return face;
                }
            }

            return null;
        },

        hasFaceAt(worldX, worldY, camera) {
            return !!this.getFaceAt(worldX, worldY, camera);
        },
    };

    var Contains = function (shape, x, y, gameObject) {
        var faces = gameObject.faces;
        for (var i = 0, cnt = faces.length; i < cnt; i++) {
            var face = faces[i];
            if (face.contains(x, y)) {
                gameObject.input.hitFace = face;
                return true;
            }
        }
        gameObject.input.hitFace = null;
        return false;
    };

    var OnPointerDown = function (pointer, localX, localY, event) {
        var face = this.input.hitFace;
        this.emit('face.pointerdown', face, pointer, localX, localY, event);
    };

    var OnPointerUp = function (pointer, localX, localY, event) {
        var face = this.input.hitFace;
        this.emit('face.pointerup', face, pointer, localX, localY, event);
        this.input.hitFace = null;
    };

    var OnPointerMove = function (pointer, localX, localY, event) {
        var face = this.input.hitFace;
        var prevFace = this.input.prevHitFace;
        if (face === prevFace) {
            this.emit('face.pointermove', face, pointer, localX, localY, event);
            return
        }

        if (prevFace) {
            this.emit('face.pointerout', prevFace, pointer, event);
        }

        if (face) {
            this.emit('face.pointerover', face, pointer, event);
        }

        this.input.prevHitFace = face;
    };

    var OnPointerOut = function (pointer, event) {
        var face = this.input.prevHitFace;
        if (face) {
            this.emit('face.pointerout', face, pointer, event);
        }

        this.input.hitFace = null;
        this.input.prevHitFace = null;
    };

    var SetFaceInteractive = function (config) {
        if (this.input) {
            return;
        }

        if (config === undefined) {
            config = {};
        }
        config.hitArea = {};
        config.hitAreaCallback = Contains;

        this
            .setInteractive(config)
            .on('pointerdown', OnPointerDown, this)
            .on('pointerup', OnPointerUp, this)
            .on('pointermove', OnPointerMove, this)
            .on('pointerover', OnPointerMove, this)
            .on('pointerout', OnPointerOut, this);

        return this;
    };

    var Methods$1 = {
        setFaceInteractive: SetFaceInteractive
    };

    Object.assign(
        Methods$1,
        VertexMethods,
        DirtyFlagsMethods,
        UpdateMethods,
        TintMethods,
        DebugMethods,
        PointMethods,
    );

    const ShaderSourceFS = Phaser.Renderer.WebGL.Shaders.MultiFrag;
    const ShaderSourceVS = Phaser.Renderer.WebGL.Shaders.MultiVert;
    const ShaderAdditionMakers = Phaser.Renderer.WebGL.ShaderAdditionMakers;
    const MakeApplyTint = ShaderAdditionMakers.MakeApplyTint;
    const MakeDefineTexCount = ShaderAdditionMakers.MakeDefineTexCount;
    const MakeGetTexCoordOut = ShaderAdditionMakers.MakeGetTexCoordOut;
    const MakeGetTexRes = ShaderAdditionMakers.MakeGetTexRes;
    const MakeSmoothPixelArt = ShaderAdditionMakers.MakeSmoothPixelArt;
    const MakeGetTexture = ShaderAdditionMakers.MakeGetTexture;
    const Utils = Phaser.Renderer.WebGL.Utils;
    const BatchHandlerQuad = Phaser.Renderer.WebGL.RenderNodes.BatchHandlerQuad;
    const getTint = Utils.getTintAppendFloatAlpha;

    class BatchHandlerTriangles extends BatchHandlerQuad {
        constructor(manager, config) {
            super(manager, config);
            // We do not expect to use extra textures.
            this.renderOptions.multiTexturing = true;
        }

        _generateElementIndices(instances) {
            // Independent Triangles
            var buffer = new ArrayBuffer(instances * 5 * 2);
            var indices = new Uint16Array(buffer);

            // 0,0,1,2,2,3,3,4,5,5,6,6,7,8,8,....
            var offset = 0;
            for (var i = 0; i < instances; i++) {
                var index = i * 3;
                indices[offset++] = index;      // Duplicate
                indices[offset++] = index;
                indices[offset++] = index + 1;
                indices[offset++] = index + 2;
                indices[offset++] = index + 2;  // Duplicate
            }
            return buffer;
        }

        batchTriangles(
            drawingContext,
            src,
            calcMatrix,
            glTexture,
            vertices,
            uv,
            colors,
            alphas,
            alpha,
            tintFill,
            renderOptions,
            debugCallback
        ) {
            if (this.instanceCount === 0) {
                this.manager.setCurrentBatchNode(this, drawingContext);
            }

            var submittedInstanceCount = vertices.length / (2 * this.verticesPerInstance);
            if (submittedInstanceCount > this.instancesPerBatch) {
                throw new Error('rexBatchHandlerTriangle: Vertex count exceeds maximum per batch (' + this.maxVerticesPerBatch + ')');
            }

            // Check whether the batch should be rendered immediately.
            // This guarantees that none of the arrays are full below.
            if (this.instanceCount + submittedInstanceCount > this.instancesPerBatch) {
                this.run(drawingContext);

                // Now the batch is empty.
            }

            // Check render options and run the batch if they differ.
            this.updateRenderOptions(renderOptions);
            if (this._renderOptionsChanged) {
                this.run(drawingContext);
                this.updateShaderConfig();
            }

            // Process textures and get relevant data.
            var textureDatum = this.batchTextures(glTexture);

            // Update the vertex buffer.
            var vertexOffset32 = this.instanceCount * this.floatsPerInstance;
            var vertexBuffer = this.vertexBufferLayout.buffer;
            var vertexViewF32 = vertexBuffer.viewF32;
            var vertexViewU32 = vertexBuffer.viewU32;

            var roundPixels = drawingContext.camera.roundPixels;

            var debugVertices;
            if (debugCallback) {
                debugVertices = [];
            }

            var a = calcMatrix.a;
            var b = calcMatrix.b;
            var c = calcMatrix.c;
            var d = calcMatrix.d;
            var e = calcMatrix.e;
            var f = calcMatrix.f;

            var displayOffsetX = -src.displayOriginX;
            var displayOffsetY = -src.displayOriginY;

            var meshVerticesLength = vertices.length;
            for (var i = 0; i < meshVerticesLength; i += 6) {
                for (var j = 0; j < 3; j++) {
                    var vertexIndex = i + j * 2;
                    var x = vertices[vertexIndex];
                    var y = vertices[vertexIndex + 1];

                    x += displayOffsetX;
                    y += displayOffsetY;

                    var tx = x * a + y * c + e;
                    var ty = x * b + y * d + f;

                    if (roundPixels) {
                        tx = Math.round(tx);
                        ty = Math.round(ty);
                    }

                    var tintIndex = (i / 2) + j;
                    var tint = getTint(
                        colors[tintIndex],
                        alphas[tintIndex] * alpha
                    );

                    vertexViewF32[vertexOffset32++] = tx;
                    vertexViewF32[vertexOffset32++] = ty;
                    vertexViewF32[vertexOffset32++] = uv[vertexIndex];
                    vertexViewF32[vertexOffset32++] = uv[vertexIndex + 1];
                    vertexViewF32[vertexOffset32++] = textureDatum;
                    vertexViewF32[vertexOffset32++] = tintFill;
                    vertexViewU32[vertexOffset32++] = tint;

                    if (debugVertices) {
                        debugVertices.push(tx, ty);
                    }
                }

                this.instanceCount++;
                this.currentBatchEntry.count++;
            }

            if (debugCallback) {
                debugCallback.call(src, src, meshVerticesLength, debugVertices);
            }
        }
    }

    BatchHandlerTriangles.prototype.defaultConfig = {
        name: 'rexBatchHandlerTriangle',
        verticesPerInstance: 3,
        indicesPerInstance: 5,
        shaderName: 'REXTRI',
        vertexSource: ShaderSourceVS,
        fragmentSource: ShaderSourceFS,
        shaderAdditions: [
            MakeGetTexCoordOut(),
            MakeGetTexRes(true),
            MakeSmoothPixelArt(true),
            MakeDefineTexCount(1),
            MakeGetTexture(),
            MakeApplyTint()
        ],
        vertexBufferLayout: {
            usage: 'DYNAMIC_DRAW',
            layout: [
                {
                    name: 'inPosition',
                    size: 2
                },
                {
                    name: 'inTexCoord',
                    size: 2
                },
                {
                    name: 'inTexDatum'
                },
                {
                    name: 'inTintEffect'
                },
                {
                    name: 'inTint',
                    size: 4,
                    type: 'UNSIGNED_BYTE',
                    normalized: true
                }
            ]
        }
    };

    const GameClass = Phaser.Game;
    var IsGame = function (object) {
        return (object instanceof GameClass);
    };

    const SceneClass = Phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
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

    var AddNodeConstructor = function (game, name, constructor) {
        var renderNodes = GetGame(game).renderer.renderNodes;
        if (!renderNodes.hasNode(name, true)) {
            renderNodes.addNodeConstructor(name, constructor);
        }
    };

    const DefaultMeshNodes = new Phaser.Structs.Map([
        ['BatchHandler', 'rexBatchHandlerTriangles']
    ]);

    let Image$1 = class Image extends Image$2 {
        constructor(scene, x, y, texture, frame) {
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }
            if (texture === undefined) {
                texture = '__DEFAULT';
            }
            super(scene, 'rexMeshImage');

            this.dirtyFlags = 0;
            // Each face has 3 vertics, each vertex has x,y, u,v, alpha, color members
            this.vertices = [];
            this.faces = [];

            // Buffers
            this.vertexBuffer = null;
            this.uvBuffer = null;
            this.alphaBuffer = null;
            this.colorBuffer = null;

            this.tintFill = false;

            this.debugCallback = null;
            this.debugGraphic = null;

            this.setTexture(texture, frame);
            this.setPosition(x, y);
            this.setSizeToFrame();
            this.setOriginFromFrame();
            AddNodeConstructor(scene, 'rexBatchHandlerTriangles', BatchHandlerTriangles);
            this.initRenderNodes(this._defaultRenderNodesMap);
        }

        get _defaultRenderNodesMap() {
            return DefaultMeshNodes;
        }

        get dirty() {
            return this.dirtyFlags !== 0;
        }

        get frame() {
            return this._frame;
        }

        set frame(value) {
            if (this._frame === value) {
                return;
            }

            this._frame = value;

            var faces = this.faces;
            if (!faces) {
                return;
            }

            var frameU0 = (value) ? value.u0 : 0;
            var frameV0 = (value) ? value.v0 : 0;
            var frameU1 = (value) ? value.u1 : 0;
            var frameV1 = (value) ? value.v1 : 0;
            var frameWidth = (value) ? value.cutWidth : 0;
            var frameHeight = (value) ? value.cutHeight : 0;

            var isSizeChanged = (this._frameWidthSave !== frameWidth) || (this._frameHeightSave !== frameHeight);
            this._frameWidthSave = frameWidth;
            this._frameHeightSave = frameHeight;

            for (var i = 0, cnt = faces.length; i < cnt; i++) {
                var face = faces[i];
                face.setFrameUV(frameU0, frameV0, frameU1, frameV1);
                if (isSizeChanged) {
                    face.setFrameSize(frameWidth, frameHeight);
                }
            }
        }

        get tint() {
            if (this.faces.length > 0) {
                return this.faces[0].color;
            } else {
                return 0xffffff;
            }
        }

        set tint(value) {
            var faces = this.faces;
            for (var i = 0, cnt = faces.length; i < cnt; i++) {
                faces[i].setColor(value);
            }
        }

        //  Overrides Game Object method
        addedToScene() {
            this.scene.sys.updateList.add(this);
        }

        //  Overrides Game Object method
        removedFromScene() {
            this.scene.sys.updateList.remove(this);
        }
    };

    Object.assign(
        Image$1.prototype,
        Render,
        Methods$1
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

    var Methods = {};

    Object.assign(
        Methods,
        AnmiationMethods,
    );

    const AnimationState = Phaser.Animations.AnimationState;

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
        Methods,
    );

    var InitFaces = function (quad) {
        var isNinePointMode = quad.isNinePointMode;
        var pointsPerSide = (isNinePointMode) ? 3 : 2;

        var vertices = [];
        for (var r = 0; r < pointsPerSide; r++) {
            for (var c = 0; c < pointsPerSide; c++) {
                var u = c / (pointsPerSide - 1);
                var v = r / (pointsPerSide - 1);
                var vertex = quad.createVertex(u, v);
                vertices.push(vertex);
            }
        }

        var indices;
        if (isNinePointMode) {
            indices = NinePointsIndices;
        } else {
            if (!quad.fourPointsModeRTL) {
                indices = FourPointsIndices;
            } else {
                indices = FourPointsIndicesRTL;
            }
        }

        for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
            var vertex0 = vertices[indices[i + 0]];
            var vertex1 = vertices[indices[i + 1]];
            var vertex2 = vertices[indices[i + 2]];
            var face = quad.createFace(vertex0, vertex1, vertex2);
            quad.addFace(face);
        }

        quad.vertices.sort(function (vertexA, vertexB) {
            if (vertexA.v === vertexB.v) {
                return vertexA.u - vertexB.u;
            } else {
                return vertexA.v - vertexB.v;
            }
        });

        if (isNinePointMode) {
            quad.topLeft = vertices[0];
            quad.topCenter = vertices[1];
            quad.topRight = vertices[2];
            quad.centerLeft = vertices[3];
            quad.center = vertices[4];
            quad.centerRight = vertices[5];
            quad.bottomLeft = vertices[6];
            quad.bottomCenter = vertices[7];
            quad.bottomRight = vertices[8];
        } else {
            quad.topLeft = vertices[0];
            quad.topRight = vertices[1];
            quad.bottomLeft = vertices[2];
            quad.bottomRight = vertices[3];
        }
    };

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

    const IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$5 = Phaser.Utils.Objects.GetValue;

    class Image extends Sprite {
        constructor(scene, x, y, key, frame, config) {
            if (IsPlainObject$3(x)) {
                config = x;
                x = GetValue$5(config, 'x', 0);
                y = GetValue$5(config, 'y', 0);
                key = GetValue$5(config, 'key', null);
                frame = GetValue$5(config, 'frame', null);
            }

            super(scene, x, y, key, frame);
            this.type = 'rexQuadImage';
            this.isNinePointMode = GetValue$5(config, 'ninePointMode', false);
            this.fourPointsModeRTL = GetValue$5(config, 'rtl', false);

            InitFaces(this);
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            super.destroy(fromScene);
        }
    }

    function QuadImageFactory (x, y, texture, frame, config) {
        var gameObject = new Image(this.scene, x, y, texture, frame, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue$3 = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject$3 = Phaser.GameObjects.BuildGameObject;

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

    const DynamicTexture = Phaser.Textures.DynamicTexture;

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

    const Rectangle$1 = Phaser.Geom.Rectangle;
    const Vector2 = Phaser.Math.Vector2;
    const RotateAround = Phaser.Math.RotateAround;
    const P3Container = Phaser.GameObjects.Container;

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
            return gameObject.getTopLeft(output);
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
            return gameObject.getTopRight(output);
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
            return gameObject.getBottomLeft(output);
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
            return gameObject.getBottomRight(output);
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

    const Rectangle = Phaser.Geom.Rectangle;
    const Union = Phaser.Geom.Rectangle.Union;

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

    const GameObjectClass = Phaser.GameObjects.GameObject;
    const LayerClass = Phaser.GameObjects.Layer;

    var IsGameObject = function (object) {
        return (object instanceof GameObjectClass) || (object instanceof LayerClass);
    };

    var GetValue$4 = Phaser.Utils.Objects.GetValue;

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

    const IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$3 = Phaser.Utils.Objects.GetValue;

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

            this.resetFaceSize();

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

    const GetAdvancedValue$2 = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject$2 = Phaser.GameObjects.BuildGameObject;

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
        var vertices = gameObject.vertices;
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

    const IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$2 = Phaser.Utils.Objects.GetValue;
    const DegToRad = Phaser.Math.DegToRad;
    const RadToDeg = Phaser.Math.RadToDeg;

    class SkewImage extends Image {
        constructor(scene, x, y, key, frame) {
            if (IsPlainObject$1(x)) {
                var config = x;
                x = GetValue$2(config, 'x', 0);
                y = GetValue$2(config, 'y', 0);
                key = GetValue$2(config, 'key', null);
                frame = GetValue$2(config, 'frame', null);
            }

            super(scene, x, y, key, frame);
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

    function SkewImageFactory (x, y, texture, frame) {
        var gameObject = new SkewImage(this.scene, x, y, texture, frame);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject$1 = Phaser.GameObjects.BuildGameObject;

    function SkewImageCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var key = GetAdvancedValue$1(config, 'key', null);
        var frame = GetAdvancedValue$1(config, 'frame', null);
        var gameObject = new SkewImage(this.scene, 0, 0, key, frame);
        BuildGameObject$1(this.scene, gameObject, config);

        return gameObject;
    }

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$1 = Phaser.Utils.Objects.GetValue;

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

            this.resetFaceSize();

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

    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

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

    const GetValue = Phaser.Utils.Objects.GetValue;

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

    var IsInValidKey = function (keys) {
        return (keys == null) || (keys === '') || (keys.length === 0);
    };

    var GetEntry = function (target, keys, defaultEntry) {
        var entry = target;
        if (IsInValidKey(keys)) ; else {
            if (typeof (keys) === 'string') {
                keys = keys.split('.');
            }

            var key;
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                key = keys[i];
                if ((entry[key] == null) || (typeof (entry[key]) !== 'object')) {
                    var newEntry;
                    if (i === cnt - 1) {
                        if (defaultEntry === undefined) {
                            newEntry = {};
                        } else {
                            newEntry = defaultEntry;
                        }
                    } else {
                        newEntry = {};
                    }

                    entry[key] = newEntry;
                }

                entry = entry[key];
            }
        }

        return entry;
    };

    var SetValue = function (target, keys, value, delimiter) {
        if (delimiter === undefined) {
            delimiter = '.';
        }

        // no object
        if (typeof (target) !== 'object') {
            return;
        }

        // invalid key
        else if (IsInValidKey(keys)) {
            // don't erase target
            if (value == null) {
                return;
            }
            // set target to another object
            else if (typeof (value) === 'object') {
                target = value;
            }
        } else {
            if (typeof (keys) === 'string') {
                keys = keys.split(delimiter);
            }

            var lastKey = keys.pop();
            var entry = GetEntry(target, keys);
            entry[lastKey] = value;
        }

        return target;
    };

    class QuadImagePlugin extends Phaser.Plugins.BasePlugin {

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
