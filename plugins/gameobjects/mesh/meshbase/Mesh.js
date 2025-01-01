import Render from './render/Render.js';
import BatchHandlerTriangles from './render/BatchHandlerTriangles.js';
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

        this.faces = [];
        this.vertices;
        this.uv;
        this.colors;
        this.alphas;

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

    addFace(u0, v0, u1, v1, u2, v2) {
        var face;
        if (typeof (u0) === 'number') {
            face = new Face(u0, v0, u1, v1, u2, v2);
        } else {
            face = u0;
        }
        // setFrameSize(frameWidth, frameHeight)
        // setFrameUV(frameU0, frameV0, frameU1, frameV1)
        this.faces.push(face);
        return this;
    }

    resizeArrays(newSize) {
        this.vertices = new Float32Array(newSize * 3);
        this.uv = new Float32Array(newSize * 3);
        
        var colors = this.colors;
        var alphas = this.alphas;

        colors = new Uint32Array(newSize * 3);
        alphas = new Float32Array(newSize * 3);

        for (var i = 0; i < newSize * 2; i++)
        {
            colors[i] = 0xffffff;
            alphas[i] = 1;
        }

        this.colors = colors;
        this.alphas = alphas;

        return this;
    }

    updateVertices() {
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
    ]
);

export default Mesh;