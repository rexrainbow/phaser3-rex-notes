(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexperspectiveimageplugin = factory());
})(this, (function () { 'use strict';

    const GameObject = Phaser.GameObjects.GameObject;

    let Image$2 = class Image extends GameObject {
    };

    const Components$1 = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Image$2,
        [
            Components$1.AlphaSingle,
            Components$1.BlendMode,
            Components$1.Depth,
            Components$1.Flip,
            Components$1.Mask,
            Components$1.Origin,
            Components$1.RenderNodes,
            Components$1.Size,
            Components$1.Texture,
            Components$1.Transform,
            Components$1.Visible,
            Components$1.ScrollFactor,
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

    const RotateAround$3 = Phaser.Math.RotateAround;

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

    const Linear$1 = Phaser.Math.Linear;
    const RotateAround$2 = Phaser.Math.RotateAround;

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
            this.frameU = Linear$1(frameU0, frameU1, this.u);
            this.frameV = Linear$1(frameV0, frameV1, this.v);
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

    const RadToDeg$3 = Phaser.Math.RadToDeg;
    const DegToRad$4 = Phaser.Math.DegToRad;

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
            return RadToDeg$3(this._rotation);
        }

        set angle(value) {
            this.rotation = DegToRad$4(value);
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

    var Methods$2 = {
        setFaceInteractive: SetFaceInteractive
    };

    Object.assign(
        Methods$2,
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
        Methods$2
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

    var Methods$1 = {};

    Object.assign(
        Methods$1,
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
        Methods$1,
    );

    var RenderMethods = {
        skipRender() {
            if (this.hideBackFace && this.isBackFace) {
                return true;
            }

            return SkipRender.call(this);
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
        var vertices = gameObject.vertices;

        if ((rotationX === 0) && (rotationY === 0) && (rotationZ === 0)) {
            for (var i = 0, cnt = vertices.length; i < cnt; i++) {
                vertices[i].resetPosition();
            }
            return;
        }

        if (centerX === undefined) {
            centerX = gameObject.width / 2;
        }
        if (centerY === undefined) {
            centerY = gameObject.height / 2;
        }

        var vertex, x, y, z, xTemp, yTemp, zTemp;
        var cosX = Math.cos(rotationX),
            sinX = Math.sin(rotationX);
        var cosY = Math.cos(rotationY),
            sinY = Math.sin(rotationY);
        var cosZ = Math.cos(rotationZ),
            sinZ = Math.sin(rotationZ);
        var perspective = gameObject.scene.scale.gameSize.width,
            scale;
        var xyz;
        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
            vertex = vertices[i];
            x = vertex.frameX - centerX;
            y = vertex.frameY - centerY;
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
            vertex.localX = x * scale + centerX;
            vertex.localY = y * scale + centerY;

            // Store [x,y,z]
            if (!vertex.hasOwnProperty('xyz')) {
                vertex.xyz = [0, 0, 0];
            }
            xyz = vertex.xyz;
            xyz[0] = x;
            xyz[1] = y;
            xyz[2] = z;
        }
    };

    var IsBackFace = function (face) {
        var v0 = face.vertices[0].xyz;  // [x,y,z]
        var v1 = face.vertices[1].xyz;  // [x,y,z]
        var v2 = face.vertices[2].xyz;  // [x,y,z]

        var edge1 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
        var edge2 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];

        var normal = [
            edge1[1] * edge2[2] - edge1[2] * edge2[1],
            edge1[2] * edge2[0] - edge1[0] * edge2[2],
            edge1[0] * edge2[1] - edge1[1] * edge2[0]
        ];

        return normal[2] < 0;
    };

    const IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$d = Phaser.Utils.Objects.GetValue;
    const RadToDeg$2 = Phaser.Math.RadToDeg;
    const DegToRad$3 = Phaser.Math.DegToRad;

    class Image extends Sprite {
        constructor(scene, x, y, key, frame, config) {
            if (IsPlainObject$3(x)) {
                config = x;
                x = GetValue$d(config, 'x', 0);
                y = GetValue$d(config, 'y', 0);
                key = GetValue$d(config, 'key', null);
                frame = GetValue$d(config, 'frame', null);
            }

            super(scene, x, y, key, frame);
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
            Rotate(this, this._rotationX, this._rotationY, this._rotationZ);
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
            Rotate(this, this._rotationX, this._rotationY, this._rotationZ);
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
            Rotate(this, this._rotationX, this._rotationY, this._rotationZ);
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
        if (gameObject.faces.length > 0) {
            gameObject.isBackFace = IsBackFace(gameObject.faces[0]);
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

    const GetAdvancedValue$2 = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject$2 = Phaser.GameObjects.BuildGameObject;

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
    const RotateAround$1 = Phaser.Math.RotateAround;
    const P3Container$1 = Phaser.GameObjects.Container;

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
            RotateAround$1(output, gameObject.x, gameObject.y, gameObject.rotation);
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
    const LayerClass$1 = Phaser.GameObjects.Layer;

    var IsGameObject = function (object) {
        return (object instanceof GameObjectClass) || (object instanceof LayerClass$1);
    };

    var GetValue$c = Phaser.Utils.Objects.GetValue;

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

    const IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$b = Phaser.Utils.Objects.GetValue;

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

    const GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject$1 = Phaser.GameObjects.BuildGameObject;

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
        var version = Phaser.VERSION.split('.');
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

    CheckP3Version();

    const Zone = Phaser.GameObjects.Zone;
    const AddItem = Phaser.Utils.Array.Add;
    const RemoveItem = Phaser.Utils.Array.Remove;

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
                        !child.displayList         // Not in scene, neither in layer
                    ) {
                        // Destroy child which is not in scene, container, or layer manually
                        child.destroy(fromScene);
                    }
                }
            }

            // Destroy/remove children
            this.clear(!fromScene);
            super.destroy(fromScene);
        }

        contains(gameObject) {
            return (this.children.indexOf(gameObject) !== -1);
        }

        add(gameObjects) {
            var parent = this;
            AddItem(this.children, gameObjects, 0,
                // Callback of item added
                function (gameObject) {
                    gameObject.once('destroy', parent.onChildDestroy, parent);
                }, this);
            return this;
        }

        remove(gameObjects, destroyChild) {
            var parent = this;
            RemoveItem(this.children, gameObjects,
                // Callback of item removed
                function (gameObject) {
                    gameObject.off('destroy', parent.onChildDestroy, parent);
                    if (destroyChild) {
                        gameObject.destroy();
                    }
                }
            );
            return this;
        }

        onChildDestroy(child, fromScene) {
            // Only remove reference
            this.remove(child, false);
        }

        clear(destroyChild) {
            var parent = this;
            var gameObject;
            for (var i = 0, cnt = this.children.length; i < cnt; i++) {
                gameObject = this.children[i];
                gameObject.off('destroy', parent.onChildDestroy, parent);
                if (destroyChild) {
                    gameObject.destroy();
                }
            }
            this.children.length = 0;
            return this;
        }
    }

    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Base,
        [
            Components.Alpha,
            Components.Flip
        ]
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

    const DegToRad$2 = Phaser.Math.DegToRad;
    const RadToDeg$1 = Phaser.Math.RadToDeg;

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

    const GetValue$a = Phaser.Utils.Objects.GetValue;
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

        this.addToRenderLayer(gameObject);         // Sync parent's render-layer
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

            if (!destroyChild) {
                this.removeFromRenderLayer(gameObject);
            }

            BaseRemove.call(this, gameObject, destroyChild);
            return this;
        },

        // Don't override this method
        unpin(gameObject, destroyChild) {
            if (GetParent(gameObject) !== this) {
                return this;
            }
            this.setParent(gameObject, null);

            if (!destroyChild) {
                this.removeFromRenderLayer(gameObject);
            }

            BaseRemove.call(this, gameObject, destroyChild);
            return this;
        },

        clear(destroyChild) {
            var children = this.children;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                this.setParent(child, null);

                if (!destroyChild) {
                    this.removeFromRenderLayer(child);
                }
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

    const DegToRad$1 = Phaser.Math.DegToRad;

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

        clearMask(destroyMask) {
            if (destroyMask === undefined) {
                destroyMask = false;
            }

            var self = this;

            // Clear current mask
            this._mask = null;

            this.setChildMaskVisible(this);
            // Also set maskVisible to `true`

            this.children.forEach(function (child) {
                // Clear child's mask
                if (child.clearMask) {
                    child.clearMask(false);
                }

                if (!child.hasOwnProperty('isRexContainerLite')) {
                    self.setChildMaskVisible(child);
                    // Set child's maskVisible to `true`
                }
            });

            if (destroyMask && this.mask) {
                this.mask.destroy();
            }

            return this;
        },
    };

    var FilterDisplayGameObjects = function (gameObjects) {
        return gameObjects.filter(function (gameObject) {
            if (gameObject.displayList) {
                // Inside a scene or a layer
                return true;
            } else if (gameObject.parentContainer) {
                // Inside a container
                return true;
            }
        })
    };

    var Depth = {
        setDepth(value, containerOnly) {
            this.depth = value;
            if (!containerOnly && this.children) {
                var children = this.getAllChildren();
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    children[i].depth = value;
                }
            }
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
            if (this.children) {
                var children = this.getAllChildren();
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    children[i].depth += inc;
                }
            }
            return this;
        },

        bringToTop() {
            var displayList = this.displayList;
            if (!displayList) {
                return this;
            }

            var children = this.getAllChildren([this]);
            SortGameObjectsByDepth(children, false);
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (displayList.exists(child)) {
                    displayList.bringToTop(child);
                }
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

            var children = this.getAllChildren([this]);
            SortGameObjectsByDepth(children, true);
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (displayList.exists(child)) {
                    displayList.sendToBack(child);
                }
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

            var children = this.getAllChildren([this]);
            SortGameObjectsByDepth(children, false);
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (displayList.exists(child)) {
                    displayList.moveBelow(gameObject, child);
                    break;
                }
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

            var children = this.getAllChildren([this]);
            SortGameObjectsByDepth(children, true);
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (displayList.exists(child)) {
                    displayList.moveAbove(gameObject, child);
                    break;
                }
            }
            return this;
        },

        moveMyDepthAbove(gameObject) {
            return this.moveDepthAbove(gameObject);
        },

        bringChildToTop(child) {
            var gameObjects;
            if ((child !== this) && child.isRexContainerLite) {
                gameObjects = child.getAllChildren([child]);
                gameObjects = FilterDisplayGameObjects(gameObjects);
                gameObjects = SortGameObjectsByDepth(gameObjects, false);
            } else {
                gameObjects = [child];
            }

            var children = this.getAllChildren([this]);
            children = FilterDisplayGameObjects(children);
            children = SortGameObjectsByDepth(children, false);
            var topChild = children[children.length - 1];

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
            var gameObjects;
            if ((child !== this) && child.isRexContainerLite) {
                gameObjects = child.getAllChildren([child]);
                gameObjects = FilterDisplayGameObjects(gameObjects);
                gameObjects = SortGameObjectsByDepth(gameObjects, false);
            } else {
                gameObjects = [child];
            }

            var children = this.getAllChildren([this]);
            children = FilterDisplayGameObjects(children);
            children = SortGameObjectsByDepth(children, false);
            var bottomChild = children[0];

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

    const ArrayUtils = Phaser.Utils.Array;

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

    const ContainerClass = Phaser.GameObjects.Container;

    var IsContainerGameObject = function (gameObject) {
        return (gameObject instanceof ContainerClass);
    };

    const LayerClass = Phaser.GameObjects.Layer;

    var IsLayerGameObject = function (gameObject) {
        return (gameObject instanceof LayerClass);
    };

    var GetValidChildren = function (parent) {
        var children = parent.getAllChildren([parent]);
        children = children.filter(function (gameObject) {
            return !!gameObject.displayList ||   // At scene's displayList or at a layer
                !!gameObject.parentContainer;  // At a container
        });
        return children;
    };

    var AddToContainer = function (p3Container) {
        var gameObjects = GetValidChildren(this);
        // This containerLite parent should be considered.
        if (gameObjects.indexOf(this) === -1) {
            gameObjects.push(this);
        }

        SortGameObjectsByDepth(gameObjects);

        p3Container.add(gameObjects);
    };

    var RemoveFromContainer = function (p3Container, descending, addToScene) {
        if (!this.scene) {
            // Destroyed
            return;
        }

        var gameObjects = GetValidChildren(this);

        SortGameObjectsByDepth(gameObjects, descending);

        p3Container.remove(gameObjects);

        if (addToScene) {
            gameObjects.forEach(function (gameObject) {
                gameObject.addToDisplayList();
            });
        }
    };

    var P3Container = {
        addToContainer(p3Container) {
            if (!IsContainerGameObject(p3Container)) {
                return this;
            }

            this._setParentContainerFlag = true;
            AddToContainer.call(this, p3Container);
            this._setParentContainerFlag = false;
            return this;
        },

        addToLayer(layer) {
            if (!IsLayerGameObject(layer)) {
                return this;
            }

            AddToContainer.call(this, layer);

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

            if (!IsLayerGameObject(this.displayList)) {
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

            if (IsLayerGameObject(parentLayer)) {
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

    var RenderLayer = {
        hasLayer() {
            return !!this.privateRenderLayer;
        },

        enableLayer() {
            if (this.hasLayer()) {
                return this;
            }

            var layer = this.scene.add.layer();
            // layer.name = (this.name) ? `${this.name}.privateLayer` : 'privateLayer';

            this.moveDepthBelow(layer);

            this.addToLayer(layer);

            this.privateRenderLayer = layer;

            return this;
        },

        getLayer() {
            if (!this.hasLayer()) {
                this.enableLayer();
            }

            return this.privateRenderLayer;
        },

        getRenderLayer() {
            // This containerLite has a layer
            if (this.hasLayer()) {
                return this.privateRenderLayer;
            }

            // One of parent container has a layer
            var parent = this.getParent();
            while (parent) {
                var layer = parent.privateRenderLayer;
                if (layer) {
                    return layer;
                }
                parent = parent.getParent();
            }

            return null;
        },

        // Internal method for adding child
        addToRenderLayer(gameObject) {
            // Don't add to layer if gameObject is not in any displayList
            if (!gameObject.displayList) {
                return this;
            }

            // Move gameObject from scene to layer
            var layer = this.getRenderLayer();
            if (!layer) {
                return this;
            }

            if (layer === gameObject.displayList) {
                return this;
            }

            if (gameObject.isRexContainerLite) {
                // Add containerLite and its children
                gameObject.addToLayer(layer);
            } else {
                // Add gameObject directly
                layer.add(gameObject);
            }

            var state = GetLocalState(gameObject);
            state.layer = layer;

            return this;
        },

        // Internal method for removing child
        removeFromRenderLayer(gameObject) {
            // Move gameObject from layer to scene
            var state = GetLocalState(gameObject);
            var layer = state.layer;
            if (!layer) {
                return this;
            }

            if (gameObject.isRexContainerLite) {
                // Remove containerLite and its children
                gameObject.removeFromLayer(true);
            } else {
                // Remove gameObject directly
                layer.remove(gameObject);
            }

            state.layer = null;

            return this;
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

    const GetValue$9 = Phaser.Utils.Objects.GetValue;

    var DrawBounds$1 = function (gameObjects, graphics, config) {
        var strokeColor, lineWidth, fillColor, fillAlpha, padding;
        if (typeof (config) === 'number') {
            strokeColor = config;
        } else {
            strokeColor = GetValue$9(config, 'color');
            lineWidth = GetValue$9(config, 'lineWidth');
            fillColor = GetValue$9(config, 'fillColor');
            fillAlpha = GetValue$9(config, 'fillAlpha', 1);
            padding = GetValue$9(config, 'padding', 0);
        }

        if (Array.isArray(gameObjects)) {
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                Draw(gameObjects[i], graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding);
            }
        } else {
            Draw(gameObjects, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding);
        }
    };

    var Draw = function (gameObject, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding) {
        var canDrawBound = gameObject.getBounds ||
            ((gameObject.width !== undefined) && (gameObject.height !== undefined));
        if (!canDrawBound) {
            return;
        }

        if (strokeColor === undefined) { strokeColor = 0xffffff; }
        if (lineWidth === undefined) { lineWidth = 1; }
        if (fillColor === undefined) { fillColor = null; }    if (fillAlpha === undefined) { fillAlpha = 1; }    if (padding === undefined) { padding = 0; }

        var p0 = GetTopLeft(gameObject, Points[0]);
        p0.x -= padding;
        p0.y -= padding;

        var p1 = GetTopRight(gameObject, Points[1]);
        p1.x += padding;
        p1.y -= padding;

        var p2 = GetBottomRight(gameObject, Points[2]);
        p2.x += padding;
        p2.y += padding;

        var p3 = GetBottomLeft(gameObject, Points[3]);
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

    const GetValue$8 = Phaser.Utils.Objects.GetValue;

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

    const RotateAround = Phaser.Math.RotateAround;

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
        RenderLayer,
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
            this.privateRenderLayer = undefined;

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

            if (this.privateRenderLayer && this.privateRenderLayer.scene) {
                this.privateRenderLayer.list.length = 0;  // Remove all children without trigger callback
                this.privateRenderLayer.destroy();
            }
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

            this.syncMask();
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

    const RadToDeg = Phaser.Math.RadToDeg;
    const DegToRad = Phaser.Math.DegToRad;

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

    const IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
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
                EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
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

    const GetValue$7 = Phaser.Utils.Objects.GetValue;

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

    const GetValue$6 = Phaser.Utils.Objects.GetValue;

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

    const GetValue$5 = Phaser.Utils.Objects.GetValue;

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

    const GetValue$4 = Phaser.Utils.Objects.GetValue;
    const Clamp = Phaser.Math.Clamp;

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

    const GetValue$3 = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

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

    const GetValue$2 = Phaser.Utils.Objects.GetValue;
    const Linear = Phaser.Math.Linear;

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

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$1 = Phaser.Utils.Objects.GetValue;

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

    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function PerspectiveCardCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var gameObject = new Card(this.scene, 0, 0, config);
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

    class ContainerPerspective extends MeshRenderTextureBase(RenderTexture$1) {
        get perspectiveState() {
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

    class PerspectiveImagePlugin extends Phaser.Plugins.BasePlugin {

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
