import { FilterName } from './const.js';
import FragSrc from './vignette-frag.js';

import { Renderer as PhaserRenderer } from 'phaser';
class VignetteFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('config', [controller.radius, controller.strength]);
        programManager.setUniform('position', [controller.x, controller.y]);
    }

}

export default VignetteFilter;