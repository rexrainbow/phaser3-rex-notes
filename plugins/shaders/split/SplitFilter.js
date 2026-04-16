import { FilterName } from './const.js';
import FragSrc from './split-frag.js';

class SplitFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
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