import { FilterName } from './const.js';
import FragSrc from './wipe-frag.js';

import { Renderer as PhaserRenderer } from 'phaser';
class WarpFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('config', [controller.progress, controller.wipeWidth, controller.direction, controller.axis]);
        programManager.setUniform('reveal', controller.reveal);
    }

}

export default WarpFilter;