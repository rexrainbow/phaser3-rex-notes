import { FilterName } from './const.js';
import FragSrc from './shine-frag.js';
import GetCurrentTime from '../utils/GetCurrentTime.js';

class ShineFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        controller.now = GetCurrentTime(this.manager.renderer.game, controller.now);
        programManager.setUniform('config', [controller.speed, controller.now, controller.lineWidth, controller.gradient]);
        programManager.setUniform('reveal', controller.reveal);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }

}

export default ShineFilter;