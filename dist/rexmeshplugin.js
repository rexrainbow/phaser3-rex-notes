(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexmeshplugin = factory());
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

    var IsPlainObject = function (obj)
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
        if (IsPlainObject(columns)) {
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

    var Methods$1 = {};

    Object.assign(
        Methods$1,
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
            Methods$1
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

    var Methods = {};

    Object.assign(
        Methods,
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
        Methods,
    );

    function MeshFactory (x, y, texture, frame) {
        var gameObject = new Sprite(this.scene, x, y, texture, frame);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function MeshCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var key = GetAdvancedValue(config, 'key', null);
        var frame = GetAdvancedValue(config, 'frame', null);
        var gameObject = new Sprite(this.scene, 0, 0, key, frame);
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

    class MeshPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexMesh', MeshFactory, MeshCreator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.Mesh', Sprite);

    return MeshPlugin;

}));
