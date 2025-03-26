import { FilterName } from './const.js';
import FragSrc from './warp-frag.js';
import GetCurrentTime from '../utils/GetCurrentTime.js';

class WarpFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        if (controller.speedEnable) {
            controller.now = GetCurrentTime(this.manager.renderer.game, controller.now);
        }

        programManager.setUniform('frequency', [controller.frequencyX, controller.frequencyY]);
        programManager.setUniform('amplitude', [controller.amplitudeX, controller.amplitudeY]);

        programManager.setUniform('speed', [controller.speed.x, controller.speed.y]);
        programManager.setUniform('time', controller.now);

        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }

}

export default WarpFilter;