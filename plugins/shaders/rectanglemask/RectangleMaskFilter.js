import { FilterName } from './const.js';
import FragSrc from './rectanglemask-frag.js';

import { Renderer as PhaserRenderer } from 'phaser';
class RectangleMaskFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, FragSrc);
    }

    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
        programManager.setUniform('rect', [controller.x, controller.y, controller.width, controller.height]);
        programManager.setUniform('feather', controller.feather);
        programManager.setUniform('invert', controller.invert);
    }
}

export default RectangleMaskFilter;
