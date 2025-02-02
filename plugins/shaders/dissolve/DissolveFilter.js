import { FilterName } from './const.js';
import FragSrc from './dissolve-frag.js';

class DissolveFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    setupTextures(controller, textures, drawingContext) {
        textures[1] = controller.toFrame.glTexture;
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('progress', controller.progress);
        programManager.setUniform('resizeMode', controller.resizeMode);
        programManager.setUniform('noiseX', controller.noiseX);
        programManager.setUniform('noiseY', controller.noiseY);
        programManager.setUniform('noiseZ', controller.noiseZ);
        programManager.setUniform('fromEdgeStart', controller.fromEdgeStart);
        programManager.setUniform('fromEdgeWidth', controller.fromEdgeWidth);
        programManager.setUniform('toEdgeStart', controller.toEdgeStart);
        programManager.setUniform('toEdgeWidth', controller.toEdgeWidth);

        programManager.setUniform('fromRatio', drawingContext.width / drawingContext.height);
        programManager.setUniform('toRatio', controller.toRatio);

        programManager.setUniform('uMainSampler2', 1);

    }
}

export default DissolveFilter;