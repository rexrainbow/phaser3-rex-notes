import { FilterName } from './const.js';
import FragSrc from './colorreplace-frag.js';

class ColorReplaceFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('epsilon', controller.epsilon);
        programManager.setUniform('originalColor', [controller._originalColor.redGL, controller._originalColor.greenGL, controller._originalColor.blueGL]);
        programManager.setUniform('newColor', [controller._newColor.redGL, controller._newColor.greenGL, controller._newColor.blueGL]);
    }
}

export default ColorReplaceFilter;