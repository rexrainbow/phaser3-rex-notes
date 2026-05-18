import { FilterName } from './const';
import FragSrc from './horrifi-frag';
import GetCurrentTime from '../utils/GetCurrentTime';

import { Renderer as PhaserRenderer } from 'phaser';
class ToonifyFilter extends PhaserRenderer.WebGL.RenderNodes.BaseFilterShader {
    manager: any;
    programManager: any;

    static FilterName = FilterName;

    constructor(manager?: any) {
        super(FilterName, manager, null, FragSrc);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller?: any, drawingContext?: any) {
        const programManager = this.programManager;

        programManager.setUniform('noiseSeed', controller.noiseSeed);

        // Bloon
        programManager.setUniform('bloomEnable', (controller.bloomEnable) ? 1 : 0);
        programManager.setUniform('bloom', [controller.bloomRadius, controller.bloomIntensity, controller.bloomThreshold]);
        programManager.setUniform('bloomTexel', [controller.bloomTexelWidth, controller.bloomTexelHeight]);

        // Chromatic abberation
        programManager.setUniform('chromaticEnable', (controller.chromaticEnable) ? 1 : 0);
        programManager.setUniform('chabIntensity', controller.chabIntensity);

        // Vignette
        programManager.setUniform('vignetteEnable', (controller.vignetteEnable) ? 1 : 0);
        programManager.setUniform('vignette', [controller.vignetteStrength, controller.vignetteIntensity]);

        // Noise
        programManager.setUniform('noiseEnable', (controller.noiseEnable) ? 1 : 0);
        programManager.setUniform('noiseStrength', controller.noiseStrength);

        // VHS
        programManager.setUniform('vhsEnable', (controller.vhsEnable) ? 1 : 0);
        programManager.setUniform('vhsStrength', controller.vhsStrength);

        // Scanlines
        programManager.setUniform('scanlinesEnable', (controller.scanlinesEnable) ? 1 : 0);
        programManager.setUniform('scanStrength', controller.scanStrength);

        // CRT        
        programManager.setUniform('crtEnable', (controller.crtEnable) ? 1 : 0);
        programManager.setUniform('crtSize', [controller.crtWidth, controller.crtHeight]);

        // Eanble by VHS    
        if (controller.vhsEnable) {
            controller.now = GetCurrentTime(this.manager.renderer.game, controller.now);
        }
        programManager.setUniform('time', controller.now);
    }
}

export default ToonifyFilter;