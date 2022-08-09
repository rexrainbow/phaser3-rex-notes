import FragSrc from './horrifi-postfxfrag.js';
import Methods from './methods/Methods.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

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
        this.bloomRadius = 0;
        this.bloomIntensity = 0;
        this.bloomThreshold = 0;
        this.bloomTexelX = 0;
        this.bloomTexelY = 0;

        // Chromatic abberation
        this.enableChromatic = false;
        this.chabIntensity = 0;

        // Vignette
        this.enableVignette = false;
        this.vignetteStrength = 0;
        this.vignetteIntensity = 0;

        // Noise
        this.enableNoise = false;
        this.noiseStrength = 0;

        // VHS
        this.enableVHS = false;
        this.vhsStrength = 0;

        // Scanlines
        this.enableScanlines = false;
        this.scanStrength = 0;

        // CRT
        this.enableCRT = false;
        this.crtWidth = 1;
        this.crtHeight = 1;
    }

    resetFromJSON(o) {
        var enable = GetValue(o, 'enable', false);

        // Bloom
        this.setBloomEnable(GetValue(o, 'bloomEnable', enable));
        this.setBloomRadius(GetValue(o, 'bloomRadius', 0));


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
        this.set2f('crtSize', this.crtWidth, this.crtHeight);

        // Eanble by VHS    
        if (this.enableVHS) {
            this.now += this.game.loop.delta;
        }
        this.set1f('time', this.now);
    }
}

Object.assign(
    HorrifiPostFxPipeline.prototype,
    Methods
)

export default HorrifiPostFxPipeline;