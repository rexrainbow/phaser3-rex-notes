import { FilterName } from './const.js';
import FragSrc from './toonify-frag.js';

import { Renderer as PhaserRenderer } from 'phaser';
class ToonifyFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('edgeThreshold', controller.edgeThreshold);
        programManager.setUniform('hsvStep', [controller.hueStep, controller.satStep, controller.valStep]);
        programManager.setUniform('edgeColor', [controller._edgeColor.redGL, controller._edgeColor.greenGL, controller._edgeColor.blueGL]);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }
}

export default ToonifyFilter;