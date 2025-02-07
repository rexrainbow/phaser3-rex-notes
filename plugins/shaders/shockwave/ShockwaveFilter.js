import { FilterName } from './const.js';
import FragSrc from './shockwave-frag.js';

class ShockwaveFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('waveConfig', [controller.waveRadius, controller.waveWidth / 2]);
        programManager.setUniform('powConfig', [controller.powBaseScale, controller.powExponent]);
        programManager.setUniform('center', [controller.centerX, controller.centerY]);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }
}

export default ShockwaveFilter;