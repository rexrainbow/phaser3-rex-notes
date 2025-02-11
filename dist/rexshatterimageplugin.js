(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexshatterimageplugin = factory());
})(this, (function () { 'use strict';

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

        var calcMatrix = GetCalcMatrix(src, camera, parentMatrix).calc;

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

    const RotateAround$1 = Phaser.Math.RotateAround;

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
        RotateAround$1(out, 0, 0, gameObject.rotation);
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
        RotateAround$1(out, 0, 0, -gameObject.rotation);
        out.x += ox;
        out.y += oy;

        return out;
    };

    var GlobalXY$1 = {};

    const Linear = Phaser.Math.Linear;
    const RotateAround = Phaser.Math.RotateAround;

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
            RotateAround(GlobalXY, ox, oy, rotation);
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

    const RadToDeg = Phaser.Math.RadToDeg;
    const DegToRad = Phaser.Math.DegToRad;

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
            return RadToDeg(this._rotation);
        }

        set angle(value) {
            this.rotation = DegToRad(value);
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
    }

    var IsPlainObject$3 = function (obj)
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
        if (IsPlainObject$3(columns)) {
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

    var Methods$2 = {};

    Object.assign(
        Methods$2,
        VertexMethods,
        DirtyFlagsMethods,
        UpdateMethods,
        TintMethods,
        DebugMethods
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

    const GameObject = Phaser.GameObjects.GameObject;
    const DefaultMeshNodes = new Phaser.Structs.Map([
        ['BatchHandler', 'rexBatchHandlerTriangles']
    ]);

    class Image extends GameObject {
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

            var face;
            for (var i = 0, cnt = faces.length; i < cnt; i++) {
                face = faces[i];
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
    }

    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Image,
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
            Render,
            Methods$2
        ]
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

    class Sprite extends Image {
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

    var ConfigurationMethods = {
        setRingRadiusList(ringRadiusList) {
            this.ringRadiusList = ringRadiusList;
            return this;
        },

        setSamplesPerRing(samples) {
            this.samplesPerRing = samples;
            return this;
        },

        setVariation(variation) {
            this.variation = variation;
            return this;
        }
    };

    var ResetImage = function () {
        this
            .clear()
            .addGridFaces(1, 1);
        return this
    };

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var delaunay = {exports: {}};

    (function (module) {
    	// https://github.com/darkskyapp/delaunay-fast/blob/master/delaunay.js

    	var Delaunay;

    	(function() {

    	    var EPSILON = 1.0 / 1048576.0;

    	    function supertriangle(vertices) {
    	        var xmin = Number.POSITIVE_INFINITY,
    	            ymin = Number.POSITIVE_INFINITY,
    	            xmax = Number.NEGATIVE_INFINITY,
    	            ymax = Number.NEGATIVE_INFINITY,
    	            i, dx, dy, dmax, xmid, ymid;

    	        for(i = vertices.length; i--; ) {
    	            if(vertices[i][0] < xmin) xmin = vertices[i][0];
    	            if(vertices[i][0] > xmax) xmax = vertices[i][0];
    	            if(vertices[i][1] < ymin) ymin = vertices[i][1];
    	            if(vertices[i][1] > ymax) ymax = vertices[i][1];
    	        }

    	        dx = xmax - xmin;
    	        dy = ymax - ymin;
    	        dmax = Math.max(dx, dy);
    	        xmid = xmin + dx * 0.5;
    	        ymid = ymin + dy * 0.5;

    	        return [
    	            [xmid - 20 * dmax, ymid -      dmax],
    	            [xmid            , ymid + 20 * dmax],
    	            [xmid + 20 * dmax, ymid -      dmax]
    	        ];
    	    }

    	    function circumcircle(vertices, i, j, k) {
    	        var x1 = vertices[i][0],
    	            y1 = vertices[i][1],
    	            x2 = vertices[j][0],
    	            y2 = vertices[j][1],
    	            x3 = vertices[k][0],
    	            y3 = vertices[k][1],
    	            fabsy1y2 = Math.abs(y1 - y2),
    	            fabsy2y3 = Math.abs(y2 - y3),
    	            xc, yc, m1, m2, mx1, mx2, my1, my2, dx, dy;

    	        /* Check for coincident points */
    	        if(fabsy1y2 < EPSILON && fabsy2y3 < EPSILON)
    	            throw new Error("Eek! Coincident points!");

    	        if(fabsy1y2 < EPSILON) {
    	            m2  = -((x3 - x2) / (y3 - y2));
    	            mx2 = (x2 + x3) / 2.0;
    	            my2 = (y2 + y3) / 2.0;
    	            xc  = (x2 + x1) / 2.0;
    	            yc  = m2 * (xc - mx2) + my2;
    	        }

    	        else if(fabsy2y3 < EPSILON) {
    	            m1  = -((x2 - x1) / (y2 - y1));
    	            mx1 = (x1 + x2) / 2.0;
    	            my1 = (y1 + y2) / 2.0;
    	            xc  = (x3 + x2) / 2.0;
    	            yc  = m1 * (xc - mx1) + my1;
    	        }

    	        else {
    	            m1  = -((x2 - x1) / (y2 - y1));
    	            m2  = -((x3 - x2) / (y3 - y2));
    	            mx1 = (x1 + x2) / 2.0;
    	            mx2 = (x2 + x3) / 2.0;
    	            my1 = (y1 + y2) / 2.0;
    	            my2 = (y2 + y3) / 2.0;
    	            xc  = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
    	            yc  = (fabsy1y2 > fabsy2y3) ?
    	                m1 * (xc - mx1) + my1 :
    	                m2 * (xc - mx2) + my2;
    	        }

    	        dx = x2 - xc;
    	        dy = y2 - yc;
    	        return {i: i, j: j, k: k, x: xc, y: yc, r: dx * dx + dy * dy};
    	    }

    	    function dedup(edges) {
    	        var i, j, a, b, m, n;

    	        for(j = edges.length; j; ) {
    	            b = edges[--j];
    	            a = edges[--j];

    	            for(i = j; i; ) {
    	                n = edges[--i];
    	                m = edges[--i];

    	                if((a === m && b === n) || (a === n && b === m)) {
    	                    edges.splice(j, 2);
    	                    edges.splice(i, 2);
    	                    break;
    	                }
    	            }
    	        }
    	    }

    	    Delaunay = {
    	        triangulate: function(vertices, key) {
    	            var n = vertices.length,
    	                i, j, indices, st, open, closed, edges, dx, dy, a, b, c;

    	            /* Bail if there aren't enough vertices to form any triangles. */
    	            if(n < 3)
    	                return [];

    	            /* Slice out the actual vertices from the passed objects. (Duplicate the
    	             * array even if we don't, though, since we need to make a supertriangle
    	             * later on!) */
    	            vertices = vertices.slice(0);

    	            if(key)
    	                for(i = n; i--; )
    	                    vertices[i] = vertices[i][key];

    	            /* Make an array of indices into the vertex array, sorted by the
    	             * vertices' x-position. */
    	            indices = new Array(n);

    	            for(i = n; i--; )
    	                indices[i] = i;

    	            indices.sort(function(i, j) {
    	                return vertices[j][0] - vertices[i][0];
    	            });

    	            /* Next, find the vertices of the supertriangle (which contains all other
    	             * triangles), and append them onto the end of a (copy of) the vertex
    	             * array. */
    	            st = supertriangle(vertices);
    	            vertices.push(st[0], st[1], st[2]);

    	            /* Initialize the open list (containing the supertriangle and nothing
    	             * else) and the closed list (which is empty since we havn't processed
    	             * any triangles yet). */
    	            open   = [circumcircle(vertices, n + 0, n + 1, n + 2)];
    	            closed = [];
    	            edges  = [];

    	            /* Incrementally add each vertex to the mesh. */
    	            for(i = indices.length; i--; edges.length = 0) {
    	                c = indices[i];

    	                /* For each open triangle, check to see if the current point is
    	                 * inside it's circumcircle. If it is, remove the triangle and add
    	                 * it's edges to an edge list. */
    	                for(j = open.length; j--; ) {
    	                    /* If this point is to the right of this triangle's circumcircle,
    	                     * then this triangle should never get checked again. Remove it
    	                     * from the open list, add it to the closed list, and skip. */
    	                    dx = vertices[c][0] - open[j].x;
    	                    if(dx > 0.0 && dx * dx > open[j].r) {
    	                        closed.push(open[j]);
    	                        open.splice(j, 1);
    	                        continue;
    	                    }

    	                    /* If we're outside the circumcircle, skip this triangle. */
    	                    dy = vertices[c][1] - open[j].y;
    	                    if(dx * dx + dy * dy - open[j].r > EPSILON)
    	                        continue;

    	                    /* Remove the triangle and add it's edges to the edge list. */
    	                    edges.push(
    	                        open[j].i, open[j].j,
    	                        open[j].j, open[j].k,
    	                        open[j].k, open[j].i
    	                    );
    	                    open.splice(j, 1);
    	                }

    	                /* Remove any doubled edges. */
    	                dedup(edges);

    	                /* Add a new triangle for each edge. */
    	                for(j = edges.length; j; ) {
    	                    b = edges[--j];
    	                    a = edges[--j];
    	                    open.push(circumcircle(vertices, a, b, c));
    	                }
    	            }

    	            /* Copy any remaining open triangles to the closed list, and then
    	             * remove any triangles that share a vertex with the supertriangle,
    	             * building a list of triplets that represent triangles. */
    	            for(i = open.length; i--; )
    	                closed.push(open[i]);
    	            open.length = 0;

    	            for(i = closed.length; i--; )
    	                if(closed[i].i < n && closed[i].j < n && closed[i].k < n)
    	                    open.push(closed[i].i, closed[i].j, closed[i].k);

    	            /* Yay, we're done! */
    	            return open;
    	        },
    	        contains: function(tri, p) {
    	            /* Bounding box test first, for quick rejections. */
    	            if((p[0] < tri[0][0] && p[0] < tri[1][0] && p[0] < tri[2][0]) ||
    	                (p[0] > tri[0][0] && p[0] > tri[1][0] && p[0] > tri[2][0]) ||
    	                (p[1] < tri[0][1] && p[1] < tri[1][1] && p[1] < tri[2][1]) ||
    	                (p[1] > tri[0][1] && p[1] > tri[1][1] && p[1] > tri[2][1]))
    	                return null;

    	            var a = tri[1][0] - tri[0][0],
    	                b = tri[2][0] - tri[0][0],
    	                c = tri[1][1] - tri[0][1],
    	                d = tri[2][1] - tri[0][1],
    	                i = a * d - b * c;

    	            /* Degenerate tri. */
    	            if(i === 0.0)
    	                return null;

    	            var u = (d * (p[0] - tri[0][0]) - b * (p[1] - tri[0][1])) / i,
    	                v = (a * (p[1] - tri[0][1]) - c * (p[0] - tri[0][0])) / i;

    	            /* If we're outside the tri, fail. */
    	            if(u < 0.0 || v < 0.0 || (u + v) > 1.0)
    	                return null;

    	            return [u, v];
    	        }
    	    };

    	    module.exports = Delaunay;
    	})(); 
    } (delaunay));

    var delaunayExports = delaunay.exports;
    var Delaunay = /*@__PURE__*/getDefaultExportFromCjs(delaunayExports);

    const Triangle = Phaser.Geom.Triangle;

    var Triangulate = function (vertices, triangleResult) {
        if (triangleResult === undefined) {
            triangleResult = true;
        }

        var indices = Delaunay.triangulate(vertices);
        if (triangleResult) {
            var triangles = [];
            for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
                var p0 = vertices[indices[i + 0]];
                var p1 = vertices[indices[i + 1]];
                var p2 = vertices[indices[i + 2]];
                var triangle = new Triangle(p0[0], p0[1], p1[0], p1[1], p2[0], p2[1]);
                triangles.push(triangle);
            }
            return triangles;
        } else {
            return {
                vertices: vertices,
                indices: indices
            }
        }
    };

    var IsFunction = function (obj) {    
        return obj && (typeof(obj) === 'function');
    };

    const GetValue$2 = Phaser.Utils.Objects.GetValue;
    const Clamp = Phaser.Math.Clamp;
    const DefaultRingRadiusList$1 = [1 / 27, 3 / 27, 9 / 27];

    var ShatterRectangleToTriangles = function (config) {
        var left, right, top, bottom, width, height;
        var rectangle = config.rectangle;
        if (rectangle) {
            left = rectangle.x;
            top = rectangle.y;
            width = rectangle.width;
            height = rectangle.height;
        } else {
            left = 0;
            top = 0;
            width = config.width;
            height = config.height;
        }
        right = left + width;
        bottom = top + height;

        var center = config.center;
        var centerX, centerY;
        if (center === undefined) {
            centerX = (left + right) / 2;
            centerY = (top + bottom) / 2;
        } else {
            centerX = Clamp(center.x, left, right);
            centerY = Clamp(center.y, top, bottom);
        }

        var ringRadiusList = GetValue$2(config, 'ringRadiusList', DefaultRingRadiusList$1);
        var ringSamples = GetValue$2(config, 'samplesPerRing', 12);
        var variation = GetValue$2(config, 'variation', 0.25);
        var triangleOutput = GetValue$2(config, 'triangleOutput', true);

        if (IsFunction(ringRadiusList)) {
            ringRadiusList = ringRadiusList(width, height);
        }

        var randMin = 1 - variation,
            randMax = 1 + variation;

        for (var i = 0; i < 10; i++) {
            // Can generate triangles 10 times
            try {
                var vertices = GenerateVertices(
                    centerX, centerY,
                    width, height, ringRadiusList, ringSamples,
                    randMin, randMax,
                    left, right, top, bottom
                );
                return Triangulate(vertices, triangleOutput);
            } catch (e) {

            }
        }

        throw new Error("Generate triangles fail");
    };

    var GenerateVertices = function (
        centerX, centerY,
        width, height, ringRadiusList, ringSamples,
        randMin, randMax,
        left, right, top, bottom
    ) {
        var vertices = [];
        vertices.push([centerX, centerY]);

        var radius = Math.min(width, height);
        for (var i = 0, cnt = ringRadiusList.length; i < cnt; i++) {
            AddRingVertices(
                vertices,
                centerX, centerY, (radius * ringRadiusList[i]), ringSamples,
                randMin, randMax,
                left, right, top, bottom
            );
        }

        // Vertices outside of rectangle
        var radius = Math.max(width, height) * 2;
        AddRingVertices(
            vertices,
            centerX, centerY, radius, ringSamples,
            randMin, randMax,
            left, right, top, bottom
        );

        return vertices;
    };

    const TWO_PI = Math.PI * 2;
    var AddRingVertices = function (
        vertices,
        centerX, centerY, radius, amount,
        randMin, randMax,
        leftBound, rightBound, topBound, bottomBound
    ) {
        for (var i = 0; i < amount; i++) {
            var rad = (i / amount) * TWO_PI;
            var x = centerX + Math.cos(rad) * radius * RandomRange(randMin, randMax);
            var y = centerY + Math.sin(rad) * radius * RandomRange(randMin, randMax);
            x = Clamp(x, leftBound, rightBound);
            y = Clamp(y, topBound, bottomBound);
            vertices.push([x, y]);
        }
        return vertices;
    };

    var RandomRange = function (min, max) {
        if (min === max) {
            return min;
        } else {
            return min + (max - min) * Math.random();
        }
    };

    const IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
    const DistanceSquared = Phaser.Math.Distance.Squared;

    var Shatter = function (centerX, centerY, config) {
        if (IsPlainObject$2(centerX)) {
            config = centerX;
            centerX = undefined;
            centerY = undefined;
        }

        if (IsPlainObject$2(config)) {
            if (config.hasOwnProperty('centerX')) {
                centerX = config.centerX;
            }
            if (config.hasOwnProperty('centerY')) {
                centerY = config.centerY;
            }
            if (config.hasOwnProperty('ringRadiusList')) {
                this.setRingRadiusList(config.ringRadiusList);
            }
            if (config.hasOwnProperty('samplesPerRing')) {
                this.setSamplesPerRing(config.samplesPerRing);
            }
            if (config.hasOwnProperty('variation')) {
                this.setVariation(config.variation);
            }
        }

        if (centerX === undefined) {
            centerX = this.width / 2;
            centerY = this.height / 2;
        } else {
            var worldXY = WorldXYToLocalXY(this, centerX, centerY);
            centerX = worldXY.x;
            centerY = worldXY.y;
        }

        this.shatterCenter.x = centerX;
        this.shatterCenter.y = centerY;

        // Clear faces and vertices
        this.clear();
        if ((this.width === 0) || (this.height === 0)) {
            return this;
        }

        centerX /= this.width;
        centerY /= this.height;
        var result = ShatterRectangleToTriangles({
            width: 1, height: 1,
            center: { x: centerX, y: centerY },

            triangleOutput: false,
            ringRadiusList: this.ringRadiusList,
            variation: this.variation,
            samplesPerRing: this.samplesPerRing
        });
        var vertices = result.vertices;
        var indices = result.indices;

        // Calculate vertex data
        var vertexData = [];
        for (var i = 0, cnt = vertices.length; i < cnt; i++) {
            var p = vertices[i];
            var px = p[0];
            var py = p[1];

            vertexData.push({
                g: DistanceSquared(centerX, centerY, px, py),
                x: px, y: py,
            });
        }

        // Build face
        for (var i = 0, cnt = indices.length; i < cnt; i += 3) {
            var v0 = vertexData[indices[i + 0]];
            var v1 = vertexData[indices[i + 1]];
            var v2 = vertexData[indices[i + 2]];

            var vertex0 = this.createVertex(v0.x, v0.y);
            var vertex1 = this.createVertex(v1.x, v1.y);
            var vertex2 = this.createVertex(v2.x, v2.y);
            var face = this.createFace(vertex0, vertex1, vertex2);
            this.addFace(face);

            // Sort faces from center
            face.g = Math.min(v0.g, v1.g, v2.g);
        }

        // Sort faces from center
        this.faces.sort(function (faceA, faceB) {
            return faceA.g - faceB.g;
        });

        return this;
    };

    var Methods = {
        resetImage: ResetImage,
        shatter: Shatter
    };

    Object.assign(
        Methods,
        ConfigurationMethods
    );

    const IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$1 = Phaser.Utils.Objects.GetValue;
    const DefaultRingRadiusList = [1 / 27, 3 / 27, 9 / 27];

    class ShatterImage extends Sprite {
        constructor(scene, x, y, key, frame, config) {
            if (IsPlainObject$1(x)) {
                config = x;
                x = GetValue$1(config, 'x', 0);
                y = GetValue$1(config, 'y', 0);
                key = GetValue$1(config, 'key', null);
                frame = GetValue$1(config, 'frame', null);
            }

            super(scene, x, y, key, frame);
            this.type = 'rexShatterImage';
            this.resetImage();

            this.shatterCenter = { x: null, y: null };

            this.setRingRadiusList(GetValue$1(config, 'ringRadiusList', DefaultRingRadiusList));
            this.setSamplesPerRing(GetValue$1(config, 'samplesPerRing', 12));
            this.setVariation(GetValue$1(config, 'variation', 0.25));
        }
    }

    Object.assign(
        ShatterImage.prototype,
        Methods,
    );

    function ShatterImageFactory (x, y, texture, frame, config) {
        var gameObject = new ShatterImage(this.scene, x, y, texture, frame, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject$1 = Phaser.GameObjects.BuildGameObject;

    function ShatterImageCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var key = GetAdvancedValue$1(config, 'key', null);
        var frame = GetAdvancedValue$1(config, 'frame', null);
        var gameObject = new ShatterImage(this.scene, 0, 0, key, frame, config);
        BuildGameObject$1(this.scene, gameObject, config);

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

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class RenderTexture extends ShatterImage {
        constructor(scene, x, y, width, height, config) {
            if (IsPlainObject(x)) {
                config = x;
                x = GetValue(config, 'x', 0);
                y = GetValue(config, 'y', 0);
                width = GetValue(config, 'width', 32);
                height = GetValue(config, 'height', 32);
            }

            // dynamic-texture -> quad-image
            var texture = CreateDynamicTexture(scene, width, height);

            super(scene, x, y, texture, null, config);
            this.type = 'rexShatterRenderTexture';
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
    }

    function ShatterRenderTextureFactory (x, y, width, height, config) {
        var gameObject = new RenderTexture(this.scene, x, y, width, height, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function ShatterRenderTextureCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var width = GetAdvancedValue(config, 'width', 32);
        var height = GetAdvancedValue(config, 'height', 32);
        var gameObject = new RenderTexture(this.scene, 0, 0, width, height, config);
        BuildGameObject(this.scene, gameObject, config);

        return gameObject;
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

    class ShatterImagePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexShatterImage', ShatterImageFactory, ShatterImageCreator);
            pluginManager.registerGameObject('rexShatterRenderTexture', ShatterRenderTextureFactory, ShatterRenderTextureCreator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.ShatterImage', ShatterImage);
    SetValue(window, 'RexPlugins.GameObjects.ShatterRenderTexture', RenderTexture);

    return ShatterImagePlugin;

}));
