import { FilterName } from './const';
import FragSrc from './shine-frag';
import GetCurrentTime from '../utils/GetCurrentTime';

import { Renderer as PhaserRenderer } from 'phaser';
class ShineFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    manager: any;
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        controller.now = GetCurrentTime(this.manager.renderer.game, controller.now);
        programManager.setUniform('config', [controller.speed, controller.now, controller.lineWidth, controller.gradient]);
        programManager.setUniform('reveal', controller.reveal);
        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
    }

}

export default ShineFilter;