import CheckP3Version from '../../../utils/system/CheckP3Version.js';
CheckP3Version();

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const Container = PhaserGameObjects.Container;
const GetValue = PhaserUtils.Objects.GetValue;

import WebGLRenderer from './renderer/WebGLRenderer.js';
import MaskGameObjectMethods from '../stencilmaskbase/MaskGameObjectMethods.js';

class StencilMaskContainer extends Container {
    constructor(scene, x, y, children, config) {
        super(scene, x, y, children);
        this.type = 'rexStencilMaskContainer';

        this.maskGameObjects = [];
        this.maskLocal = GetValue(config, 'local', true);
        this.setStencilInvert();
    }
}

var Methods = {
    renderWebGL: WebGLRenderer
};

Object.assign(
    StencilMaskContainer.prototype,
    Methods,
    MaskGameObjectMethods
);

export default StencilMaskContainer;
