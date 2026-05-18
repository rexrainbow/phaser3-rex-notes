import { FilterName } from './const';
import FragSrc from './shockwave-frag';

import { Renderer as PhaserRenderer } from 'phaser';
class ShockwaveFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        programManager.setUniform('waveConfig', [controller.waveRadius, controller.waveWidth / 2]);
        programManager.setUniform('powConfig', [controller.powBaseScale, controller.powExponent]);
        programManager.setUniform('center', [controller.centerX, controller.centerY]);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }
}

export default ShockwaveFilter;