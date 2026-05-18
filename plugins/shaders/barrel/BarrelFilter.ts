import { FilterName } from './const';
import FragSrc from './barrel-frag';

import { Renderer as PhaserRenderer } from 'phaser';
class BarrelFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        var shrinkMode = (controller.shrinkMode) ? 1 : 0;
        programManager.setUniform('config', [shrinkMode, controller.radius, controller.power, controller.intensity]);
        programManager.setUniform('center', [controller.centerX, controller.centerY]);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }
}

export default BarrelFilter;