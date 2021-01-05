import FragSrc from './hslAdjust-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

class HslAdjustPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexHslAdjustPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this._hueRotate = 0;
        this._satAdjust = 1;
        this._lumAdjust = 0.5;
    }

    resetFromJSON(o) {
        this.setHueRotate(GetValue(o, 'hueRotate', 0));
        this.setSatAdjust(GetValue(o, 'satAdjust', 1));
        this.setLumAdjust(GetValue(o, 'lumAdjust', 0.5));
        return this;
    }

    onPreRender() {
        this.set1f('hueRotate', (this._hueRotate) % 1);
        this.set1f('satAdjust', this._satAdjust);
        this.set1f('lumAdjust', this._lumAdjust);
    }

    // hueRotate
    get hueRotate() {
        return this._hueRotate;
    }

    set hueRotate(value) {
        this._hueRotate = value; // 0: rotate 0 degrees, 0.5: rotate 180 degrees, 1: rotate 360 degrees
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
        this._satAdjust = value; // 0: gray, 1: original color, > 1: 
    }

    setSatAdjust(value) {
        this.satAdjust = value;
        return this;
    }

    // lumAdjust
    get lumAdjust() {
        return this._lumAdjust;
    }

    set lumAdjust(value) {
        this._lumAdjust = value; // 0: dark, 0.5: original color, 1: white
    }

    setLumAdjust(value) {
        this.lumAdjust = value;
        return this;
    }
}

export default HslAdjustPostFxPipeline;