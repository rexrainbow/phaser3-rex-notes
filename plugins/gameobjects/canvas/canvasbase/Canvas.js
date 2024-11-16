import Render from './render/Render.js';
import CanvasMethods from './CanvasMethods.js';
import TextureMethods from './TextureMethods.js';

import CheckP3Version from '../../../utils/system/CheckP3Version.js';
CheckP3Version();

const CanvasPool = Phaser.Display.Canvas.CanvasPool;
const GameObject = Phaser.GameObjects.GameObject;
const UUID = Phaser.Utils.String.UUID;
const DefaultImageNodes = Phaser.Renderer.WebGL.RenderNodes.Defaults.DefaultImageNodes;

class Canvas extends GameObject {
    constructor(scene, x, y, width, height, resolution) {
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
        if (resolution === undefined) {
            resolution = 1;
        }

        super(scene, 'rexCanvas');

        this.renderer = scene.sys.game.renderer;

        this._width = width;
        this._height = height;
        this.resolution = resolution;

        width = Math.max(Math.ceil(width * this.resolution), 1);
        height = Math.max(Math.ceil(height * this.resolution), 1);
        this.canvas = CanvasPool.create(this, width, height);

        this.dirty = false;

        this.setPosition(x, y);
        this.setOrigin(0.5, 0.5);
        this.initRenderNodes(this._defaultRenderNodesMap);

        this._crop = this.resetCropObject();

        //  Create a Texture for this Text object
        this._textureKey = UUID();

        this.texture = scene.sys.textures.addCanvas(this._textureKey, this.canvas);

        //  Set the context to be the CanvasTexture context
        this.context = this.texture.context;

        //  Get the frame
        this.frame = this.texture.get();

        //  Set the resolution
        this.frame.source.resolution = this.resolution;

        if (this.renderer && this.renderer.gl) {
            //  Clear the default 1x1 glTexture, as we override it later
            this.renderer.deleteTexture(this.frame.source.glTexture);
            this.frame.source.glTexture = null;
        }

        this.dirty = true;
    }

    preDestroy() {
        CanvasPool.remove(this.canvas);

        this.canvas = null;
        this.context = null;

        var texture = this.texture;

        if (texture) {
            texture.destroy();
        }
    }

    get _defaultRenderNodesMap() {
        return DefaultImageNodes;
    }

    setResolution(resolution) {
        if (this.resolution === resolution) {
            return this;
        }

        this.resolution = resolution;

        var width = Math.max(Math.ceil(this.width * resolution), 1);
        var height = Math.max(Math.ceil(this.height * resolution), 1);
        this.canvas.width = width;
        this.canvas.height = height;

        this.frame.source.resolution = resolution;
        this.dirty = true;

        return this;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this.setSize(value, this._height);
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this.setSize(this._width, value);
    }

    setCanvasSize(width, height) {
        if ((this._width === width) && (this._height === height)) {
            return this;
        }

        this._width = width;
        this._height = height;

        this.updateDisplayOrigin();

        width = Math.max(Math.ceil(width * this.resolution), 1);
        height = Math.max(Math.ceil(height * this.resolution), 1);
        this.canvas.width = width;
        this.canvas.height = height;

        this.frame.setSize(width, height);
        this.frame.source.updateSize(width, height);
        this.frame.updateUVs();

        this.dirty = true;
        return this;
    }

    // setSize might be override
    setSize(width, height) {
        this.setCanvasSize(width, height);
        return this;
    }

    get displayWidth() {
        return this.scaleX * this._width;
    }

    set displayWidth(value) {
        this.scaleX = value / this._width;
    }

    get displayHeight() {
        return this.scaleY * this._height;
    }

    set displayHeight(value) {
        this.scaleY = value / this._height;
    }

    setDisplaySize(width, height) {
        this.displayWidth = width;
        this.displayHeight = height;
        return this;
    }

    getCanvas(readOnly) {
        if (!readOnly) {
            this.dirty = true;
        }
        return this.canvas;
    }

    getContext(readOnly) {
        if (!readOnly) {
            this.dirty = true;
        }
        return this.context;
    }

    needRedraw() {
        this.dirty = true;
        return this;
    }

    resize(width, height) {
        this.setSize(width, height);
        return this;
    }
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Canvas,
    [
        Components.Alpha,
        Components.BlendMode,
        Components.Crop,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Lighting,
        Components.Mask,
        Components.Origin,
        Components.RenderNodes,
        Components.ScrollFactor,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        Render,
        CanvasMethods,
        TextureMethods,
    ]
);

export default Canvas;