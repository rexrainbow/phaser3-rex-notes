import { FilterName } from './const';
import FragSrc from './swirl-frag';

import { Renderer as PhaserRenderer } from 'phaser';
class SwirlFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        programManager.setUniform('config', [controller.radius, controller.rotation]);
        programManager.setUniform('center', [controller.centerX, (drawingContext.height - controller.centerY)]);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }
}

export default SwirlFilter;