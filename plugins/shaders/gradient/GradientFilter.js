import { FilterName } from './const.js';
import FragSrc from './gradient-frag.js';

class GradientFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('alpha', controller.alpha);

        programManager.setUniform('positionFrom', [controller.fromX, controller.fromY]);
        programManager.setUniform('positionTo', [controller.toX, controller.toY]);
        programManager.setUniform('color1', controller.glcolor1);
        programManager.setUniform('color2', controller.glcolor2);
        programManager.setUniform('size', controller.size);
    }

}

export default GradientFilter;