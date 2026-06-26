import { GameObjects as PhaserGameObjects } from 'phaser';
const Container = PhaserGameObjects.Container;

import StencilLayersBase from '../stencillayersbase/StencilLayersBase.js';

class StencilContainers extends StencilLayersBase(Container, true, false) {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        this.type = 'rexStencilContainers';
    }
}

export default StencilContainers;
