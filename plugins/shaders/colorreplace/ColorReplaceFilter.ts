import { FilterName } from './const';
import FragSrc from './colorreplace-frag';

import { Renderer as PhaserRenderer } from 'phaser';
class ColorReplaceFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        programManager.setUniform('epsilon', controller.epsilon);
        programManager.setUniform('originalColor', [controller._originalColor.redGL, controller._originalColor.greenGL, controller._originalColor.blueGL]);
        programManager.setUniform('newColor', [controller._newColor.redGL, controller._newColor.greenGL, controller._newColor.blueGL]);
    }
}

export default ColorReplaceFilter;