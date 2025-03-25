import { FilterName } from './const.js';
import FragSrc from './circle-frag.js';

class CircleFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
        programManager.setUniform('color', controller.glcolor);
        programManager.setUniform('backgroundColor', controller.glcolor2);
        programManager.setUniform('config', [controller.thickness, controller.scale, controller.feather]);
    }

}

export default CircleFilter;