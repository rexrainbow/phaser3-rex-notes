import frag from './hslAdjust-frag.js';

const TextureTintPipeline = Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class HslAdjustPipeline extends TextureTintPipeline {
    constructor(scene, key, config) {
        var game = scene.game;
        super({
            game: game,
            renderer: game.renderer,
            fragShader: frag // GLSL shader
        });   
        this._hueRotate = 0;
        this._satAdjust = 0;
        this._lumAdjust = 0;

        game.renderer.addPipeline(key, this);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setHueRotate(GetValue(o, 'hueRotate', 0));
        this.setSatAdjust(GetValue(o, 'satAdjust', 1));
        this.setLumAdjust(GetValue(o, 'lumAdjust', 1));
        return this;
    }

    // hueRotate
    get hueRotate() {
        return this._hueRotate;
    }

    set hueRotate(value) {
        this._hueRotate = value;
        this.setFloat1('hueRotate', value % 1);
    }

    setHueRotate(value) {
        this.hueRotate = value;
        return this;
    }

    // satAdjust
    get satAdjust() {
        return this._satAdjust;
    }

    set satAdjust(value) {
        this._satAdjust = value;
        this.setFloat1('satAdjust', value);
    }

    setSatAdjust(value) {
        this.satAdjust = value;
        return this;
    }

    // satAdjust
    get lumAdjust() {
        return this._lumAdjust;
    }

    set lumAdjust(value) {
        this._lumAdjust = value;
        this.setFloat1('lumAdjust', value);
    }

    setLumAdjust(value) {
        this.lumAdjust = value;
        return this;
    }
}

export default HslAdjustPipeline;