import { FilterName } from './const';
import FragSrc from './split-frag';

import { Renderer as PhaserRenderer } from 'phaser';
class SplitFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        var splitX = controller.centerX;
        var splitY = drawingContext.height - controller.centerY;

        programManager.setUniform('split', [splitX, splitY]);
        programManager.setUniform('angle', controller.rotation);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);

        programManager.setUniform('spaceConfig', [controller.spaceLeft, controller.spaceRight, controller.spaceTop, controller.spaceBottom]);

        programManager.setUniform('shiftEnable', (controller.shiftEnable) ? 1 : 0);
    }

}

export default SplitFilter;