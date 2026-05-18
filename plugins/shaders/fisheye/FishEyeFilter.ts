import { FilterName } from './const';
import FragSrc from './fisheye-frag';

import { Renderer as PhaserRenderer } from 'phaser';
class FishEyeFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        var centerX = controller.centerX;
        var centerY = drawingContext.height - controller.centerY;
        programManager.setUniform('config', [controller.fishEyeMode, controller.radius, controller.intensity]);
        programManager.setUniform('center', [centerX, centerY]);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }
}
export default FishEyeFilter;