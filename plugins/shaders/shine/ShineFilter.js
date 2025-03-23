import { FilterName } from './const.js';
import FragSrc from './shine-frag.js';
import GetTickDelta from '../../utils/system/GetTickDelta.js';

class ShineFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        controller.now += GetTickDelta(this.manager.renderer.game);
        programManager.setUniform('config', [controller.speed, controller.now, controller.lineWidth, controller.gradient]);
        programManager.setUniform('reveal', controller.reveal);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }

}

export default ShineFilter;