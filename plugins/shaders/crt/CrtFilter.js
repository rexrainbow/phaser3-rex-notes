import { FilterName } from './const.js';
import FragSrc from './crt-frag.js';

class CrtFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('warp', [controller.warpX, controller.warpY]);
        programManager.setUniform('scanLineStrength', controller.scanLineStrength);
        programManager.setUniform('scanLineWidth', controller.scanLineWidth);
    }

}

export default CrtFilter;