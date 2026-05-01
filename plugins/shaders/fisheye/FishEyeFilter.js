import { FilterName } from './const.js';
import FragSrc from './fisheye-frag.js';

import { Renderer as PhaserRenderer } from 'phaser';
class FishEyeFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        var centerX = controller.centerX;
        var centerY = drawingContext.height - controller.centerY;
        programManager.setUniform('config', [controller.fishEyeMode, controller.radius, controller.intensity]);
        programManager.setUniform('center', [centerX, centerY]);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }
}
export default FishEyeFilter;