import Render from './render/Render.js';
import Methods from './methods/Methods.js';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';

const Mesh2D = PhaserGameObjects.Mesh2D;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class Image extends Mesh2D {
    constructor(scene, x, y, key, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', '__DEFAULT');
            frame = GetValue(config, 'frame', null);
        }

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (key === undefined || key === null) { key = '__DEFAULT'; }

        super(scene, x, y, key, [], [], GetValue(config, 'flipV', false));

        this.type = 'rexMeshImage';

        // Keep Mesh2D#vertices as the renderer-facing flat [x, y, u, v] array.
        this.vertexObjects = [];
        this.faceIndices = [];
        this.texturePage = GetValue(config, 'texturePage', 0);
        this.autoBuildOrderedIndices = GetValue(config, 'useOrderedIndices', false);
        this.orderedIndicesStrategy = GetValue(config, 'orderedIndicesStrategy', 2);
        this.debugCallback = null;
        this.debugGraphic = null;

        this.setRenderAsTriangles(GetValue(config, 'renderAsTriangles', false));
        this.setUseOrderedIndices(this.autoBuildOrderedIndices);

        if (frame !== undefined && frame !== null) {
            this.setFrame(frame);
        }

        this.setSizeToFrame();
        this.setOriginFromFrame();
    }

    get frame() {
        return this._frame;
    }

    set frame(value) {
        if (this._frame === value) {
            return;
        }

        this._frame = value;

        if (this.vertexObjects) {
            this.syncVertexObjectsFrame();
        }
    }
}

Object.assign(
    Image.prototype,
    Render,
    Methods
);

export default Image;
