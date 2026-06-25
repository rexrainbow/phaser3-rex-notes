import CheckP3Version from '../../../utils/system/CheckP3Version.js';
CheckP3Version();

import { GameObjects as PhaserGameObjects } from 'phaser';
const Layer = PhaserGameObjects.Layer;

import WebGLRenderer from './renderer/WebGLRenderer.js';
import StencilGameObjectMethods from './StencilGameObjectMethods.js';


class StencilLayer extends Layer {
    constructor(scene, children) {
        super(scene, children);
        this.type = 'rexStencilLayer';

        this.stencilGameObjects = [];
        this.setStencilInvert();
    }

}

var Methods = {
    renderWebGL: WebGLRenderer
}

Object.assign(
    StencilLayer.prototype,
    Methods,
    StencilGameObjectMethods
);

export default StencilLayer;
