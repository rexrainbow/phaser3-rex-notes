import { FilterName } from './const';
import FragSrc from './crossstitching-frag';

import { Renderer as PhaserRenderer } from 'phaser';
class CrossStitchingFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        programManager.setUniform('stitchingSize', [controller.stitchingWidth, controller.stitchingHeight]);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
        programManager.setUniform('brightness', controller._brightness);
    }

}

export default CrossStitchingFilter;