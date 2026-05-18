import { FilterName } from './const';
import FragSrc from './hslAdjust-frag';

import { Renderer as PhaserRenderer } from 'phaser';
class HslAdjustFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        programManager.setUniform('hsvAdjust', [(controller.hueRotate) % 1, controller.satAdjust, controller.lumAdjust]);
    }
}

export default HslAdjustFilter;