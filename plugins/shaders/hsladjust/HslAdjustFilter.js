import { FilterName } from './const.js';
import FragSrc from './hslAdjust-frag.js';

class HslAdjustFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('hsvAdjust', [(controller.hueRotate) % 1, controller.satAdjust, controller.lumAdjust]);
    }
}

export default HslAdjustFilter;