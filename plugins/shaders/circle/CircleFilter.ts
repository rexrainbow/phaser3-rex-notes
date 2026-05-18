import { FilterName } from './const';
import FragSrc from './circle-frag';

import { Renderer as PhaserRenderer } from 'phaser';
class CircleFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
        programManager.setUniform('color', controller.glcolor);
        programManager.setUniform('backgroundColor', controller.glcolor2);
        programManager.setUniform('config', [controller.thickness, controller.scale, controller.feather]);
    }

}

export default CircleFilter;