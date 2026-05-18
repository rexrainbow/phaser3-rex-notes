import { FilterName } from './const';
import FragSrc from './toonify-frag';

import { Renderer as PhaserRenderer } from 'phaser';
class ToonifyFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        programManager.setUniform('edgeThreshold', controller.edgeThreshold);
        programManager.setUniform('hsvStep', [controller.hueStep, controller.satStep, controller.valStep]);
        programManager.setUniform('edgeColor', [controller._edgeColor.redGL, controller._edgeColor.greenGL, controller._edgeColor.blueGL]);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }
}

export default ToonifyFilter;