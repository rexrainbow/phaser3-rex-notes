import { FilterName } from './const';
import FragSrc from './warp-frag';
import GetCurrentTime from '../utils/GetCurrentTime';

import { Renderer as PhaserRenderer } from 'phaser';
class WarpFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    manager: any;
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        if (controller.speedEnable) {
            controller.now = GetCurrentTime(this.manager.renderer.game, controller.now);
        }

        programManager.setUniform('frequency', [controller.frequencyX, controller.frequencyY]);
        programManager.setUniform('amplitude', [controller.amplitudeX, controller.amplitudeY]);

        programManager.setUniform('speed', [controller.speed.x, controller.speed.y]);
        programManager.setUniform('time', controller.now);

        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }

}

export default WarpFilter;