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

        this.tintFill = (texture === '__DEFAULT') ? true : false;

        this.anims = new AnimationState(this);

        this.debugCallback = null;
        this.debugGraphic = null;

        this.setTexture(texture, frame);
        this.setPosition(x, y);
        this.setSizeToFrame();
        AddNodeConstructor(scene, 'rexBatchHandlerTriangles', BatchHandlerTriangles);
        this.initRenderNodes(this._defaultRenderNodesMap);
    }

    get _defaultRenderNodesMap() {
        return DefaultMeshNodes;
    }

    get dirty() {
        return this.dirtyFlags !== 0;
    }

    preUpdate(time, delta) {
        var prevFrame = this.anims.currentFrame;
        this.anims.update(time, delta);

        if (this.anims.currentFrame !== prevFrame) {
            var curFrame = this.anims.currentFrame.frame;
            var frameWidth = (curFrame) ? curFrame.cutWidth : 0;
            var frameHeight = (curFrame) ? curFrame.cutHeight : 0;
            var frameU0 = (curFrame) ? curFrame.u0 : 0;
            var frameV0 = (curFrame) ? curFrame.v0 : 0;
            var frameU1 = (curFrame) ? curFrame.u1 : 0;
            var frameV1 = (curFrame) ? curFrame.v1 : 0;
            var faces = this.faces;
            for (var i = 0, cnt = faces.length; i < cnt; i++) {
                faces[i]
                    .setFrameSize(frameWidth, frameHeight)
                    .setFrameUV(frameU0, frameV0, frameU1, frameV1)
            }
        }

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