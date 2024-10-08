(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexquadimageplugin = factory());
})(this, (function () { 'use strict';

    const Mesh = Phaser.GameObjects.Mesh;

    class MeshBase extends Mesh {
        get tint() {
            if (this.vertices.length === 0) {
                return 0xffffff;
            } else {
                return this.vertices[0].color;
            }
        }

        forceUpdate() {
            this.dirtyCache[10] = 1;
            return this;
        }

    }

    const RotateAround$1 = Phaser.Math.RotateAround;

    var LocalXYToWorldXY = function (gameObject, localX, localY) {
        var ox = gameObject.width / 2;
        var oy = gameObject.height / 2;
        out.x = localX - ox;
        out.y = localY - oy;
        RotateAround$1(out, 0, 0, gameObject.rotation);
        out.x *= gameObject.scaleX;
        out.y *= gameObject.scaleY;
        out.x += gameObject.x;
        out.y += gameObject.y;

        return out;
    };

    var WorldXYToLocalXY = function (gameObject, worldX, worldY) {
        var ox = gameObject.width / 2;
        var oy = gameObject.height / 2;

        out.x = worldX - gameObject.x;
        out.y = worldY - gameObject.y;
        out.x /= gameObject.scaleX;
        out.y /= gameObject.scaleY;
        RotateAround$1(out, 0, 0, -gameObject.rotation);
        out.x += ox;
        out.y += oy;

        return out;
    };

    var out = { x: 0, y: 0 };

    class ControlPoint {
        constructor(parent, vertex) {
            this.parent = parent;
            this.vertex = vertex;
            this._localX = undefined;
            this._localY = undefined;
        }

        destroy() {
            this.parent = undefined;
            this.vertex = undefined;
        }

        updateVertexPosition(x, y) {
            var gameObject = this.parent;
            var srcHeight = gameObject.height;
            var vHalfWidth = (gameObject.frame.cutWidth / srcHeight) / 2;
            var vHalfHeight = (gameObject.frame.cutHeight / srcHeight) / 2;

            var vx = (x / srcHeight) - vHalfWidth;
            var vy = (y / srcHeight) - vHalfHeight;

            var vertex = this.vertex;
            vertex.x = vx;
            vertex.y = -vy;
            gameObject.forceUpdate();
            return this;
        }

        get localX() {
            return this._localX;
        }

        set localX(x) {
            this.setLocalXY(x, this._localY);
        }

        get localY() {
            return this._localY;
        }

        set localY(y) {
            this.setLocalXY(this._localX, y);
        }

        get localXOrigin() {
            return this._localXOrigin;
        }

        get localYOrigin() {
            return this._localYOrigin;
        }

        resetLocalXY(x, y) {
            this._localXOrigin = x;
            this._localYOrigin = y;
            this._localX = x;
            this._localY = y;
            return this;
        }

        setLocalXY(x, y, ignoreUpdateVertex) {
            if ((this._localX === x) && (this._localY === y)) {
                return this;
            }

            this._localX = x;
            this._localY = y;

            if (!ignoreUpdateVertex) {
                this.updateVertexPosition(x, y);
            }

            return this;
        }

        setWorldXY(x, y) {
            if ((this._worldX === x) && (this._worldY === y)) {
                return this;
            }

            var localXY = WorldXYToLocalXY(this.parent, x, y);
            this.setLocalXY(localXY.x, localXY.y);

            return this;
        }

        setPosition(x, y) {
            this.setWorldXY(x, y);
            return this;
        }

        getWorldXY() {
            return LocalXYToWorldXY(this.parent, this._localX, this._localY);
        }

        get x() {
            var worldXY = LocalXYToWorldXY(this.parent, this._localX, this._localY);
            return worldXY.x;
        }

        set x(x) {
            this.setWorldXY(x, this.y);
        }

        get y() {
            var worldXY = LocalXYToWorldXY(this.parent, this._localX, this._localY);
            return worldXY.y;
        }

        set y(y) {
            this.setWorldXY(this.x, y);
        }
    }

    const Vertex = Phaser.Geom.Mesh.Vertex;
    const Face = Phaser.Geom.Mesh.Face;

    var InitFaces = function (quad) {
        var isNinePointMode = quad.isNinePointMode;
        var pointCount = (isNinePointMode) ? 9 : 4;

        var vertices = quad.vertices;
        var faces = quad.faces;
        var controlPoints = quad.controlPoints;
        for (var i = 0; i < pointCount; i++) {
            var vertex = new Vertex();
            vertices.push(vertex);
            controlPoints.push(new ControlPoint(quad, vertex));
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
            var vert1 = vertices[indices[i + 0]];
            var vert2 = vertices[indices[i + 1]];
            var vert3 = vertices[indices[i + 2]];
            faces.push(new Face(vert1, vert2, vert3));
        }

        if (isNinePointMode) {
            quad.topLeft = controlPoints[0];
            quad.topCenter = controlPoints[1];
            quad.topRight = controlPoints[2];
            quad.centerLeft = controlPoints[3];
            quad.center = controlPoints[4];
            quad.centerRight = controlPoints[5];
            quad.bottomLeft = controlPoints[6];
            quad.bottomCenter = controlPoints[7];
            quad.bottomRight = controlPoints[8];
        } else {
            quad.topLeft = controlPoints[0];
            quad.topRight = controlPoints[1];
            quad.bottomLeft = controlPoints[2];
            quad.bottomRight = controlPoints[3];
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

    var GetPointPosition = function (quad) {
        var points;
        var top = 0, bottom = quad.height,
            left = 0, right = quad.width;
        if (quad.isNinePointMode) {
            var centerX = (left + right) / 2;
            var centerY = (top + bottom) / 2;
            points = [
                left, top,        // top-left
                centerX, top,     // top-center
                right, top,       // top-right
                left, centerY,    // center-left
                centerX, centerY, // center-center
                right, centerY,   // top-right
                left, bottom,     // center-left
                centerX, bottom,  // bottom-center
                right, bottom     // bottom-right
            ];
        } else {
            points = [
                left, top,        // top-left
                right, top,       // top-right
                left, bottom,     // bottom-left
                right, bottom     // bottom-right
            ];
        }

        return points;
    };

    const IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$5 = Phaser.Utils.Objects.GetValue;

    class Image extends MeshBase {
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
            this.controlPoints = [];

            InitFaces(this);
            this.hideCCW = false;
            this.syncSize();
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            super.destroy(fromScene);

            for (var i = 0, cnt = this.controlPoints.length; i < cnt; i++) {
                this.controlPoints[i].destroy();
            }
            this.controlPoints = undefined;
        }

        resetVerts() {
            // Clear faces and vertices        
            this.dirtyCache[9] = -1;

            var points = GetPointPosition(this);

            // Calculate vertex data
            var srcWidth = this.width;
            var srcHeight = this.height;
            var vHalfWidth = (this.frame.cutWidth / srcHeight) / 2;
            var vHalfHeight = (this.frame.cutHeight / srcHeight) / 2;

            var frameU0 = this.frame.u0;
            var frameU1 = this.frame.u1;
            var frameV0 = this.frame.v0;
            var frameV1 = this.frame.v1;
            var frameU = frameU1 - frameU0;
            var frameV = frameV1 - frameV0;

            // Update vertex
            var controlPoints = this.controlPoints;
            for (var i = 0, cnt = points.length; i < cnt; i += 2) {
                var px = points[i + 0];
                var py = points[i + 1];
                var vertexIndex = i / 2;

                var x = (px / srcHeight) - vHalfWidth;
                var y = (py / srcHeight) - vHalfHeight;
                var u = frameU0 + (frameU * (px / srcWidth));
                var v = frameV0 + (frameV * (py / srcHeight));
                this.vertices[vertexIndex]
                    .set(x, -y, 0)
                    .setUVs(u, v);

                controlPoints[vertexIndex].resetLocalXY(px, py);
            }

            return this;
        }

        syncSize() {
            this.setSizeToFrame();  // Reset size
            this.setOrtho(this.width / this.height, 1);
            this.resetVerts();  // Reset verts
            return this;
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
    var IsGameObject = function (object) {
        return (object instanceof GameObjectClass);
    };

    var GetValue$4 = Phaser.Utils.Objects.GetValue;

    var Snapshot = function (config) {
        if (!config) {
            return;
        }

        var gameObjects = config.gameObjects;
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
        renderTexture.draw(gameObjects);

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

            // dynamic-texture -> quad-image
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

        snapshot(gameObjects, config) {
            if (config === undefined) {
                config = {};
            }
            config.gameObjects = gameObjects;
            config.renderTexture = this.rt;

            Snapshot(config);

            if ((this.width !== this.frame.realWidth) || (this.height !== this.frame.realHeight)) {
                this.syncSize();
            }

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

        var width = gameObject.width,
            height = gameObject.height;
        var ox = width * 0.5;
        var oy = height * 0.5;
        var xOffset = Math.tan(skewX) * oy;
        var yOffset = Math.tan(skewY) * ox;
        var controlPoints = gameObject.controlPoints;
        for (var i = 0, cnt = controlPoints.length; i < cnt; i++) {
            var controlPoint = controlPoints[i];
            var x = controlPoint.localXOrigin;
            var y = controlPoint.localYOrigin;
            controlPoint.localX = x + ((y > oy) ? xOffset : -xOffset);
            controlPoint.localY = y + ((x > ox) ? yOffset : -yOffset);
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
                    this.syncSize();
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
