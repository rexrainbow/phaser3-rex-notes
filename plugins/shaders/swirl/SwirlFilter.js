import { FilterName } from './const.js';
import FragSrc from './swirl-frag.js';

class SwirlFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('config', [controller.radius, controller.rotation]);
        programManager.setUniform('center', [controller.centerX, (drawingContext.height - controller.centerY)]);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }
}

export default SwirlFilter;