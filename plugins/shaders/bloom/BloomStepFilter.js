import { StepFilterName as FilterName } from './const.js';
import FragSrc from './bloomstep-frag.js';

class BloomStepFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        var x = (2 / drawingContext.width) * controller.offsetX;
        var y = (2 / drawingContext.height) * controller.offsetY;
        programManager.setUniform('offset', [x, y]);

        programManager.setUniform('strength', controller.strength);
        programManager.setUniform('color', controller.glcolor);

    }

}

export default BloomStepFilter;