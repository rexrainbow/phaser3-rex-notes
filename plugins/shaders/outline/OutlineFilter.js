import { FilterName } from './const.js';
import FragSrc from './outline-frag.js';

const MAX_SAMPLES = 100;
const MIN_SAMPLES = 1;

class OutlineFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        var shaderAdditions = [
            {
                name: 'anglestep_0.314',
                additions: {
                    fragmentDefine: '#define ANGLESTEP 0.314'
                },
                tags: ['anglestep']
            }
        ];
        super(FilterName, manager, null, FragSrc, shaderAdditions);
    }

    updateShaderConfig(controller, drawingContext) {
        var programManager = this.programManager;

        var samples = Math.max((controller.quality * MAX_SAMPLES), MIN_SAMPLES);
        var angleStep = (Math.PI * 2 / samples).toFixed(7);
        var anglestepAddition = programManager.getAdditionsByTag('anglestep')[0];
        anglestepAddition.name = 'anglestep_' + angleStep;
        anglestepAddition.additions.fragmentDefine = '#undef ANGLESTEP\n#define ANGLESTEP ' + angleStep;
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('thickness', controller.thickness);
        programManager.setUniform('outlineColor', [controller._outlineColor.redGL, controller._outlineColor.greenGL, controller._outlineColor.blueGL]);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }
}

export default OutlineFilter;