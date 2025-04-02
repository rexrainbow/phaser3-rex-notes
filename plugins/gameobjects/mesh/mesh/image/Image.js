import Base from './Base.js';
import Render from './render/Render.js';
import Methods from './methods/Methods.js';
import BatchHandlerTriangles from '../../../../utils/renderer/BatchHandlerTriangles.js';
import AddNodeConstructor from '../../../../utils/renderer/AddNodeConstructor.js';

const DefaultMeshNodes = new Phaser.Structs.Map([
    ['BatchHandler', 'rexBatchHandlerTriangles']
]);

class Image extends Base {
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
                face.setFrameSize(frameWidth, frameHeight)
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

Object.assign(
    Image.prototype,
    Render,
    Methods
);

export default Image;