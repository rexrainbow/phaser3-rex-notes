import { FilterName } from './const.js';
import FragSrc from './barrel-frag.js';

import { Renderer as PhaserRenderer } from 'phaser';
class BarrelFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        var shrinkMode = (controller.shrinkMode) ? 1 : 0;
        programManager.setUniform('config', [shrinkMode, controller.radius, controller.power, controller.intensity]);
        programManager.setUniform('center', [controller.centerX, controller.centerY]);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }
}

export default BarrelFilter;