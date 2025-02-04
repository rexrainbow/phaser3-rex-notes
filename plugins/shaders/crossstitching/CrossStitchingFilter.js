import { FilterName } from './const.js';
import FragSrc from './crossstitching-frag.js';

class CrossStitchingFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('stitchingSize', [controller.stitchingWidth, controller.stitchingHeight]);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
        programManager.setUniform('brightness', controller._brightness);
    }

}

export default CrossStitchingFilter;