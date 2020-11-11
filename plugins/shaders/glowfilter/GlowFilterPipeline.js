import FragSrc from './glowfilter-frag.js';
import FragCodeReplacer from '../utils/FragCodeReplacer';

const MultiPipeline = Phaser.Renderer.WebGL.Pipelines.MultiPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class GlowFilterPipeline extends MultiPipeline {
    constructor(scene, key, config) {
        var game = scene.game;
        var frag = FragCodeReplacer(FragSrc, game.renderer.maxTextures);
        super({
            game: game,
            fragShader: frag, // GLSL shader
            name: key,
            uniforms: ['intensity']
        });
        this._intensity = 0;

        game.renderer.pipelines.add(key, this);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setIntensity(GetValue(o, 'intensity', 0));
        return this;
    }

    bind() {
        super.bind();
        this.set1f('intensity', this._intensity);
    }

    // intensity
    get intensity() {
        return this._intensity;
    }

    set intensity(value) {
        this._intensity = Clamp(value, 0, 1);
    }

    setIntensity(value) {
        this.intensity = value;
        return this;
    }
}

export default GlowFilterPipeline;