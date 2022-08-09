import FragSrc from './horrifi-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;

class HorrifiPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexHorrifiPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.seed = Math.random();
        this.now = 0;

        // Bloon
        this.enableBloom = false;
        this.bloomRadius = 0.2;
        this.bloomIntensity = 0.2;
        this.bloomThreshold = 0.2;
        this.bloomTexelX = 0.1;
        this.bloomTexelY = 0.1;

        // Chromatic abberation
        this.enableChromatic = false;
        this.chabIntensity = 0.5;

        // Vignette
        this.enableVignette = false;
        this.vignetteStrength = 0.2;
        this.vignetteIntensity = 0.2;

        // Noise
        this.enableNoise = false;
        this.noiseStrength = 0.5;

        // VHS
        this.enableVHS = false;
        this.vhsStrength = 0.25;

        // Scanlines
        this.enableScanlines = false;
        this.scanStrength = 0.5;

        // CRT
        this.enableCRT = false;
        this.crtCurveX = 2;
        this.crtCurveY = 2;
    }

    resetFromJSON(o) {

        return this;
    }

    onPreRender() {
        this.set1f('seed', this.seed);

        // Bloon
        this.set1f('enableBloom', (this.enableBloom) ? 1 : 0);
        this.set3f('bloom', this.bloomRadius, this.bloomIntensity, this.bloomThreshold);
        this.set2f('bloomTexel', this.bloomTexelX, this.bloomTexelY);

        // Chromatic abberation
        this.set1f('enableChromatic', (this.enableChromatic) ? 1 : 0);
        this.set1f('chabIntensity', this.chabIntensity);

        // Vignette
        this.set1f('enableVignette', (this.enableVignette) ? 1 : 0);
        this.set2f('vignette', this.vignetteStrength, this.vignetteIntensity);

        // Noise
        this.set1f('enableNoise', (this.enableNoise) ? 1 : 0);
        this.set1f('noiseStrength', this.noiseStrength);

        // VHS
        this.set1f('enableVHS', (this.enableVHS) ? 1 : 0);
        this.set1f('vhsStrength', this.vhsStrength);

        // Scanlines
        this.set1f('enableScanlines', (this.enableScanlines) ? 1 : 0);
        this.set1f('scanStrength', this.scanStrength);

        // CRT        
        this.set1f('enableCRT', (this.enableCRT) ? 1 : 0);
        this.set2f('crtCurve', this.crtCurveX, this.crtCurveY);

        // Eanble by VHS    
        if (this.enableVHS) {
            this.now += this.game.loop.delta;
        }
        this.set1f('time', this.now);
    }
}

export default HorrifiPostFxPipeline;