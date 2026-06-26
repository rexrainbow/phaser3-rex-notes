import { GameObjects as PhaserGameObjects } from 'phaser';
const Layer = PhaserGameObjects.Layer;

import StencilLayersBase from '../stencillayersbase/StencilLayersBase.js';

class StencilLayers extends StencilLayersBase(Layer, false, true) {
    constructor(scene) {
        super(scene);
        this.type = 'rexStencilLayers';
    }
}

export default StencilLayers;
