import Render from './render/Render.js';
import Methods from './methods/Methods.js';
import BatchHandlerTriangles from '../../../utils/renderer/BatchHandlerTriangles.js';
import AddNodeConstructor from '../../../utils/renderer/AddNodeConstructor.js';

const GameObject = Phaser.GameObjects.GameObject;
const AnimationState = Phaser.Animations.AnimationState;
const DefaultMeshNodes = new Phaser.Structs.Map([
    ['BatchHandler', 'rexBatchHandlerTriangles']
]);

class Mesh extends GameObject {
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
        super(scene, 'rexMesh');

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

        this.anims = new AnimationState(this);

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
            face = faces[i]
            face.setFrameUV(frameU0, frameV0, frameU1, frameV1);
            if (isSizeChanged) {
                face.setFrameSize(frameWidth, frameHeight)
            }
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

    preUpdate(time, delta) {
        this.anims.update(time, delta);
    }

    preDestroy() {
        this.anims.destroy();

        this.anims = undefined;
    }
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Mesh,
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
        Methods
    ]
);

export default Mesh;