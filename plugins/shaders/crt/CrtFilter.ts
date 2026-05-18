import { FilterName } from './const';
import FragSrc from './crt-frag';

import { Renderer as PhaserRenderer } from 'phaser';
class CrtFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        programManager.setUniform('warp', [controller.warpX, controller.warpY]);
        programManager.setUniform('scanLineStrength', controller.scanLineStrength);
        programManager.setUniform('scanLineWidth', controller.scanLineWidth);
    }

}

export default CrtFilter;