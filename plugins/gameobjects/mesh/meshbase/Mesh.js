import Render from './render/Render.js';
import Methods from './methods/Methods.js';
import BatchHandlerTriangles from '../../../utils/renderer/BatchHandlerTriangles.js';
import AddNodeConstructor from '../../../utils/renderer/AddNodeConstructor.js';
import { FourPointsTriangles } from './face/DefaultTriangles.js';
import Face from './face/Face.js';


const GameObject = Phaser.GameObjects.GameObject;
const AnimationState = Phaser.Animations.AnimationState;
const DefaultMeshNodes = new Phaser.Structs.Map([
    ['BatchHandler', 'rexBatchHandlerTriangles']
]);

class Mesh extends GameObject {
    constructor(scene, x, y, texture, frame, faces) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (texture === undefined) {
            texture = '__DEFAULT';
        }
        if (faces === undefined) {
            faces = FourPointsTriangles;
        }
        super(scene, 'rexMesh');

        this.dirtyFlags = 0;
        // Each face has 3 vertics, each vertex has x,y, u,v, alpha, color members
        this.faces = [];
        // Collect vertics' x,y
        this.vertices;
        // Collect vertics' u,v
        this.uv;
        // Collect vertics' alpha
        this.alphas;
        // Collect vertics' color
        this.colors;

        this.anims = new AnimationState(this);

        this.setTexture(texture, frame);
        this.setPosition(x, y);
        this.setSizeToFrame();
        AddNodeConstructor(scene, 'rexBatchHandlerTriangles', BatchHandlerTriangles);
        this.initRenderNodes(this._defaultRenderNodesMap);

        if (faces) {
            for (var i = 0, cnt = faces.length; i < cnt; i++) {
                this.addFace(...faces[i]);
            }
        }
    }

    get _defaultRenderNodesMap() {
        return DefaultMeshNodes;
    }

    get dirty() {
        return this.dirtyFlags !== 0;
    }

    clear() {
        this.faces.length = 0;
        this.setFaceCountDirtyFlag();
        return this;
    }

    addFace(u0, v0, u1, v1, u2, v2) {
        var face;
        if (typeof (u0) === 'number') {
            face = new Face(u0, v0, u1, v1, u2, v2);
        } else {
            face = u0;
        }
        this.faces.push(face);
        this.setFaceCountDirtyFlag();

        // setFrameSize(frameWidth, frameHeight)
        // setUV(frameU0, frameV0, frameU1, frameV1)

        return this;
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