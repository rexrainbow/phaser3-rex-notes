import CheckP3Version from '../../../utils/system/CheckP3Version.js';
CheckP3Version();

import { GameObjects as PhaserGameObjects } from 'phaser';
const Layer = PhaserGameObjects.Layer;

import WebGLRenderer from './renderer/WebGLRenderer.js';
import MaskGameObjectMethods from '../stencilmaskbase/MaskGameObjectMethods.js';


class StencilMaskLayer extends Layer {
    constructor(scene, children) {
        super(scene, children);
        this.type = 'rexStencilMaskLayer';

        this.maskGameObjects = [];
        this.setStencilInvert();
    }

}

var Methods = {
    renderWebGL: WebGLRenderer
};

Object.assign(
    StencilMaskLayer.prototype,
    Methods,
    MaskGameObjectMethods
);

export default StencilMaskLayer;
