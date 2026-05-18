import { FilterName } from './const';
import FragSrc from './gradient-frag';

import { Renderer as PhaserRenderer } from 'phaser';
class GradientFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
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